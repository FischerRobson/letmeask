import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';

import { auth, firebase } from '../services/firebase'

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<User>();

    const getUserInfos = (user: any): void => {
        console.log(user)
        const { displayName, photoURL, uid } = user;
        if (!displayName || !photoURL) {
            throw new Error("Missing information form Google Account")
        }
        setUser({
            id: uid,
            name: displayName,
            avatar: photoURL,
        })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
              const { displayName, photoURL, uid } = user
      
            if(!displayName || !photoURL) {
              throw new Error('Missing information from Google Account')
            }
      
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })
            }
          })

        return () => {
            unsubscribe();
        }
    }, [])

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

        if (result.user) getUserInfos(user);
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    return context;
};