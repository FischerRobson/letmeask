import { useEffect, useState } from "react";

import { useAuth } from '../hooks/AuthContext';
import { database } from '../services/firebase';


type Question = {
    id: string;
    author: {
        name: string,
        avatar: string,
    };
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    };
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>;


export function useRoom(roomId: string) {
    
    const { user } = useAuth();

    const [questions, setQuestions] = useState<Question[]>([]);

    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        const unsubscribeRoomList = roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestion: FirebaseQuestions = databaseRoom.questions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestion).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    hasLiked: Object.values(value.likes ?? {}).some(like => like.authorId === user?.id)
                }
            });
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId, user?.id]);

    return { questions, title };

}