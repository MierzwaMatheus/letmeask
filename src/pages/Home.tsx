import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import {auth, firebase} from '../services/firebase';
 
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import logInImg from '../assets/images/log-in.svg'

import { Button } from '../components/Button';



import '../styles/auth.scss'


export function Home() {
  const navigate = useNavigate();

  function handleCreateRoom() {
    navigate("/room/new")    
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento
        com outras pessoas</p>
      </aside>

      <main>
          <div className="main-content">
          <img src={logoImg} alt="letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo da google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form action="">
            <input 
            type="text" 
            placeholder="Digite o código da tela"
            />
            <Button type="submit">
              <img src={logInImg} alt="icone de login" />
              Entre na sala 
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}