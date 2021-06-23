import { FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import illustrationImg from '../assets/images/illustration.svg';

import '../styles/auth.scss'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/AuthContext';
import { useState } from 'react';
import { database } from '../services/firebase';

export function NewRoom() {

    const { user } = useAuth();

    const history = useHistory();

    const [newRoom, setNewRoom] = useState<string>("");

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (!newRoom.trim()) return;

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });
        
        history.push(`/rooms/${firebaseRoom.key}`);
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={e => handleCreateRoom(e)}>
                        <input
                            value={newRoom}
                            onChange={e => setNewRoom(e.target.value)}
                            type="text"
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existe? <Link to="/" >clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}