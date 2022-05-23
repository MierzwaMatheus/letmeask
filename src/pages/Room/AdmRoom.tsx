import { Link, useNavigate, useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg';
import { Button } from '../../components/Button';
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
// import { useAuth } from '../hooks/useAuth';
// import { database } from '../services/firebase';

import './style.scss'
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';
 

type RoomParams = {
  id: string;
}

export function AdmRoom() {
  // const {user} = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const navigate = useNavigate()

  const {title, questions} = useRoom(roomId)

  async function handleEndRoom() {
    if (window.confirm('Tem certeza que deseja encerrar a sala?')) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      })

      navigate('/');
    }
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/question/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/question/${questionId}`).update({
      isAnswered: true,
    });

  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/question/${questionId}`).update({
      isHighlighted: true,
    });

  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <Link to={'/'}>
            <img src={logoImg} alt="Logo aplicação" />        
          </Link>
          <div className="buttons">
            <RoomCode code={roomId}  />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question 
                key={question.id}
                content={question.content}
                author={question.author}
                isHighlighted={question.isHighlighted}
                isAnswered={question.isAnswered}>

                  {!question.isAnswered && (
                    <>
                      <button type="button" onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                        <img src={checkImg} alt="Marcar como respondida" />
                      </button>

                      <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                        <img src={answerImg} alt="Dar destaque a pergunta" />
                      </button>
                    </>
                  )}

                  <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
            )
          })}
        </div>
      </main>
    </div>

  );
}