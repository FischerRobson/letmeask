import { useParams, useHistory } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import "../styles/room.scss";
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

export function AdminRoom() {

    const history = useHistory();

    const params = useParams<RoomParams>();

    const roomId = params.id;

    const { questions, title } = useRoom(roomId);

    const handleEndRoom = async () => {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })
        toast('Sala Encerrada!', {
            duration: 2000,
        });
        history.push("/");
    }

    const handleDeleteQuestion = async (questionId: string) => {
        if (window.confirm("Tem certeza que deseja excluir esta pergunta?")) {
            await database.ref(`rooms/${roomId}/questions/${questionId}/`).remove()
        }
    }

    return (
        <div id="page-room">
            <Toaster />
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={() => handleEndRoom()}>Encerrar Sala</Button>
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
                            >
                                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImg} alt="delete question" />
                                </button>
                            </Question>
                        )
                    })}
                </div>

            </main>
       </div>
    )
}