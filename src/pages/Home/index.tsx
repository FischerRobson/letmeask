import React from 'react'

import logoImg from '../../assets/images/logo.svg';
import illustrationImg from '../../assets/images/illustration.svg';
import googleImg from '../../assets/images/google-icon.svg';

import '../../styles/auth.scss'

export function Home() {
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="illustration" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="">
                    <img src={logoImg} alt="letmeask" />
                    <button>
                        <img src={googleImg} alt="logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div>Ou entre em uma sala</div>
                    <form>
                        <input type="text" placeholder="Digite o código da saça" />
                        <button type="submit">Entrar na sala</button>
                    </form>
                </div>
            </main>
        </div>
    )
}