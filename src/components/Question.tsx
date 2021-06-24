import { ReactNode } from 'react';
import '../styles/question.scss';

type Question = {
    id: string;
    author: {
        name: string,
        avatar: string,
    };
    content: string;
    // isAnswered: boolean;
    // isHighLighted: boolean;
    children?: ReactNode;
}

export function Question({id, author, content, children} :Question) {
    return (
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}