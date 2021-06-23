import { useHistory } from 'react-router'

import { useAuth } from '../hooks/AuthContext';

import logoImg from '../assets/images/logo.svg';
import illustrationImg from '../assets/images/illustration.svg';
import googleImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss'
import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../services/firebase';

export function Home() {

    const { user, signInWithGoogle } = useAuth();

    const history = useHistory();

    const [roomCode, setRoomCode] = useState<string>("");

    async function handleCreateRoom() {

        if (!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(e: FormEvent) {
        e.preventDefault();

        if (!roomCode.trim()) return;

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            return alert("Room not exists");
        }

        history.push(`/rooms/${roomCode}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="illustration" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleImg} alt="logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            value={roomCode}
                            onChange={e => setRoomCode(e.target.value)}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}