import { useContext, useState } from 'react';
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

    const [user, setUser] = useState<User>()

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);


        if (result.user) {
            const { displayName, photoURL, uid } = result.user;
            if (!displayName || !photoURL) {
                throw new Error("Missing information form Google Account")
            }
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
            })
        }

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