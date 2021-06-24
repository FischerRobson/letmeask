import { FormEvent, useState } from 'react';
import { useParams } from 'react-router';

import toast, { Toaster } from 'react-hot-toast';

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import "../styles/room.scss";
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
    id: string;
}

export function AdminRoom() {

    const params = useParams<RoomParams>();

    const roomId = params.id;

    const { questions, title } = useRoom(roomId);

    return (
        <div id="page-room">
            <Toaster />
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && (<span>{questions.length} pergunta(s)</span>)}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return ( 
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                id={question.id}
                            />
                        )
                    })}
                </div>

            </main>
       </div>
    )
}