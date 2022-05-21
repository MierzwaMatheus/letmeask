import {  useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
 
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import logInImg from '../assets/images/log-in.svg'

import { Button } from '../components/Button';

import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';


export function Home() {
  const navigate = useNavigate();
  const {signInWithGoogle, user} = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    navigate("/room/new")    
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.')
      return;
    }

    navigate(`/room/${roomCode}`)
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
          <form onSubmit={handleJoinRoom}>
            <input 
            type="text" 
            placeholder="Digite o código da tela"
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}
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