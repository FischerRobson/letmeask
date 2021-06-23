import toast from 'react-hot-toast';
import copyImg from '../assets/images/copy.svg'

import '../styles/roomCode.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code);
        toast('Código copiado!', {
            duration: 2000,
        });
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" /> 
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}