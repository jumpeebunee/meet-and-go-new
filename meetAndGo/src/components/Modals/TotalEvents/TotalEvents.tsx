import { IonContent, IonLoading, IonModal, IonSpinner } from '@ionic/react'
import cl from './TotalEvents.module.scss'
import { FC, useEffect, useState } from 'react'
import SecondButton from '../../UI/SecondButton/SecondButton';
import TabButton from '../../UI/TabButton/TabButton';
import { useSelector } from 'react-redux';
import { user } from '../../../app/feautures/userSlice';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { IEvent } from '../../../types/types';
import EventItem from '../EventItem/EventItem';

interface TotalEventsProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  setIsOpenEvent: (arg: boolean) => void;
  setOpenedEvent: (arg: IEvent) => void;
}

const TotalEvents:FC<TotalEventsProps> = ({isOpen, setIsOpen, setIsOpenEvent, setOpenedEvent}) => {

  const currentUser = useSelector(user);

  const [currentState, setCurrentState] = useState('active');
  const [events, setEvents] = useState<IEvent[]>([]);
  const [archiveEvents, setArchiveEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    setArchiveEvents(currentUser.archive);
    setIsLoading(false);
  }

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${cl.TotalEventsContainer}`}>
          <div className={cl.TotalEventsMain}>
            <h2 className={cl.TotalEventsHeading}>Мои события</h2>
            <div className={cl.TotalEventsContent}>
              <TabButton changeState={setCurrentState} state={currentState}></TabButton>
            </div>
            {events.length > 0
            ?
              <ul className={cl.TotalEventList}>
                {events.map(event => 
                  <EventItem
                    setIsOpenEvent={setIsOpenEvent}
                    setOpenedEvent={setOpenedEvent}
                    event={event}
                    key={event.id}
                  />  
                )}
              </ul>
            :
              <div className={cl.TotalEventNot}>У вас еще нет активных событий</div>
            }
          </div>
          {isLoading && <div className={cl.TotalEventsLoading}><IonSpinner name="circular"></IonSpinner></div>}
          <div className={cl.TotalEventsBtns}>
            <SecondButton onClick={() => setIsOpen(false)}>Назад</SecondButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  )
}

export default TotalEvents