import { IonContent, IonModal, IonSpinner } from '@ionic/react'
import cl from './TotalEvents.module.scss'
import { FC, useEffect, useState } from 'react'
import SecondButton from '../../UI/SecondButton/SecondButton';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../../../app/feautures/userSlice';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { IEvent } from '../../../types/types';
import TotalEventsHeader from './TotalEventsHeader';
import TotalEventsList from './TotalEventsList';
import MainButton from '../../UI/MainButton/MainButton';
import FindEvent from '../../UI/FindEvent/FindEvent';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';
import { changeNotifyOpen, changeOpened, notifications } from '../../../pages/EventNotify/EventNotifySlice';

interface TotalEventsProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  setIsOpenEvent: (arg: boolean) => void;
}

const TotalEvents:FC<TotalEventsProps> = ({isOpen, setIsOpen, setIsOpenEvent}) => {

  const userNotifications = useSelector(notifications);
  const currentUser = useSelector(user);
  const dispatch = useDispatch();

  const [currentState, setCurrentState] = useState('active');
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFind, setIsFind] = useState(false);
  const [findValue, setFindValue] = useState('');
  const [isError, setIsError] = useState('');
  const [isFindLoading, setIsFindLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getEvent();
    } else {
      setEvents([]);
    }
  }, [isOpen])

  const getEvent = async() => {
    const result = [];

    setIsLoading(true);

    if (currentUser.activeMeets) {
      for (let i = 0; i < currentUser.activeMeets.length; i++) {
        const event = currentUser.activeMeets[i];
        const docRef = doc(db, "events", event);
        const docSnap = await getDoc(docRef);
        const currentEvent = docSnap.data() as IEvent;
        result.push(currentEvent);
      }
      setEvents(result);
    }
    setIsLoading(false);
  }

  const changeState = () => {
    setIsFind(prev => !prev);
  }

  const findEvent = async() => {
    setIsError('');
    setIsFindLoading(true);
    try {
      const docRef = doc(db, "events", findValue);
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        setIsOpenEvent(true);
        dispatch(changeOpened(docSnap.data() as IEvent));
      } else {
        throw new Error('Событие не найдено');
      }
    } catch (error: any) {
      setIsError(error.message);
    } finally {
      setIsFindLoading(false);
    }
  }

  const handleOpenNotify = (event: IEvent) => {
    dispatch(changeOpened(event));
    dispatch(changeNotifyOpen(true));
  }

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${cl.TotalEventsContainer}`}>
          <div className={cl.TotalEventsMain}>
            <TotalEventsHeader currentState={currentState} setCurrentState={setCurrentState}/>
            {
              currentState === 'active'
              ?
              <>
              {isFind
                ? 
                  <div className={cl.TotalEventsFindEvent}>
                    <FindEvent
                      value={findValue}
                      setValue={setFindValue}
                      findEvent={findEvent}
                      isLoading={isFindLoading}
                    />
                    {isError && <ErrorMessage styles={{marginTop: 10}}>{isError}</ErrorMessage>}
                  </div>
                : <> {!isLoading && <TotalEventsList events={events} setIsOpenEvent={setIsOpenEvent}/>}</>
                }
              </>
              :
              <>
                <ul>
                  {userNotifications.map(event =>
                    <li onClick={() => handleOpenNotify(event)} key={event.id}>
                      <h2>{event.title}</h2>
                      <p>Оцените событие пользователя: {event.address}</p>
                    </li>
                  )}
                </ul>
              </>
            }
          </div>
          {isLoading && <div className={cl.TotalEventsLoading}><IonSpinner name="circular"></IonSpinner></div>}
          <div className={cl.TotalEventsBtns}>
            {currentState !== 'archive' && <MainButton onClick={changeState}>{isFind ? 'Список событий' : 'Найти по коду'}</MainButton>}
            <SecondButton onClick={() => setIsOpen(false)}>Назад</SecondButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  )
}

export default TotalEvents