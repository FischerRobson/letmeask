import { FormEvent, useState } from 'react';
import { useParams } from 'react-router';

import toast, { Toaster } from 'react-hot-toast';

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/AuthContext';
import { database } from '../services/firebase';

import "../styles/room.scss";
import { useEffect } from 'react';

type RoomParams = {
    id: string;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    };
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}>;

export function Room() {

    const { user } = useAuth();

    const params = useParams<RoomParams>();

    const roomId = params.id;

    const [newQuestion, setNewQuestion] = useState<string>("");

    async function handleSendQuest(e: FormEvent) {
        e.preventDefault();

        if (!newQuestion.trim()) return;

        if (!user) throw new Error('You must be logged in');

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);
        setNewQuestion("");
        toast('Pergunta enviada!', {
            duration: 2000,
        });
    }

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.once('value', room => {
            const parsedQuestions = Object.entries(room.questions ?? {})
        })
    }, [roomId]);

    return (
        <div id="page-room">
            <Toaster />
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>sala react</h1>
                    <span>4 perguntas</span>
                </div>

                <form onSubmit={handleSendQuest}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        value={newQuestion}
                        onChange={e => setNewQuestion(e.target.value)}
                    />
                    <div className="form-footer">
                        {!user ? (
                            <span>Para enviar uma pergunta <button>faça seu login</button></span>
                        ) : (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{ user.name }</span>
                            </div>
                        )}
                        <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
                    </div>
                </form>
            </main>
       </div>
    )
}