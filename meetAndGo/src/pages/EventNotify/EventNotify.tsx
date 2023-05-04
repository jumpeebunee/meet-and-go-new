import { IonContent, IonModal } from '@ionic/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeNotifyOpen, confirmNotification, isNotifyOpen, notifications, openedNotify } from './EventNotifySlice'
import MainButton from '../../components/UI/MainButton/MainButton'
import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { user } from '../../app/feautures/userSlice'
import SecondButton from '../../components/UI/SecondButton/SecondButton'
import cl from './EventNotify.module.scss';
import OpenedEventHeader from '../../components/Modals/OpenedEvent/OpenedEventHeader'
import { getFormatedDate } from '../../helpers/getFormatedDate'

const EventNotify = () => {

  const dispatch = useDispatch();

  const isOpen = useSelector(isNotifyOpen);
  const currentNotify = useSelector(openedNotify);
  const currentUser = useSelector(user);

  const [raiting, setRaitng] = useState(0);

  const handleClose = () => {
    dispatch(changeNotifyOpen(false))
  }

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        {currentNotify 
        ?
        <div className={`modal-container ${cl.EventNotifyModal}`}>
          <div className=''>
            <h2 className='heading'>Как все прошло?</h2>
            <div>
              <OpenedEventHeader title={currentNotify.title} date={getFormatedDate(currentNotify.date)}/>
              <p>Оцените эвенте</p>
              <div>Оценка: {raiting}</div>
              <ul className={cl.EventNotifyList}>
                <li><button onClick={() => setRaitng(1)}>1</button></li>
                <li><button onClick={() => setRaitng(2)}>2</button></li>
                <li><button onClick={() => setRaitng(3)}>3</button></li>
              </ul>
              <div>
                <div>Оставить жалобу:</div>
                <textarea className={cl.EventNotifyArea}>

                </textarea>
              </div>
            </div>
          </div>
          <div className={cl.EventNotifyBtns}>
            <MainButton>Отправить</MainButton>
            <SecondButton onClick={handleClose}>Закрыть</SecondButton>
          </div>
        </div>
        :
        <div></div>
        }
      </IonContent>
    </IonModal>
  )
}

export default EventNotify