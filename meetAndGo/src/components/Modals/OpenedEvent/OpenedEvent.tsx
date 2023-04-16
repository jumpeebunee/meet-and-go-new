import { IonContent, IonModal } from '@ionic/react'
import React, { FC, useEffect, useState } from 'react'
import cl from './OpenedEvent.module.scss'
import { IEvent } from '../../../types/types';
import MainButton from '../../UI/MainButton/MainButton';
import SecondButton from '../../UI/SecondButton/SecondButton';
import AppLocation from '../../UI/AppLocation/AppLocation';
import EventUsers from '../../UI/EventUsers/EventUsers';
import EventPrice from '../../UI/EventPrice/EventPrice';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useSelector } from 'react-redux';
import { user } from '../../../app/feautures/userSlice';

interface OpenedEventProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  event: IEvent;
}

const OpenedEvent:FC<OpenedEventProps> = ({isOpen, setIsOpen, event}) => {
  
  const currentDate = new Date(event.date).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'});
  const currentUser = useSelector(user);

  const [activeEvent, setActiveEvent] = useState(false);

  const handleEnter = async() => {
    const eventRef = doc(db, "events", event.id);
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(eventRef, {
      activeUsers: arrayUnion({id: currentUser.uid, image: currentUser.image}),
    });
    await updateDoc(userRef, {
      activeMeets: arrayUnion(event.id),
    });
    setIsOpen(false);
  }

  const totalActiveUsers = (event.activeUsers) ? event.activeUsers.length : null;

  useEffect(() => {
    if (isOpen) {
      const isActive = event.activeUsers.find(user => user.id === currentUser.uid);
      if (isActive) {
        setActiveEvent(true);
      } else {
        setActiveEvent(false);
      }
    }
  },[isOpen])

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${cl.openedEventContainer}`}>
          <div>
            <div className={cl.openedEventHeader}>
              <h2 className={cl.openedEventHeading}>{event.title}</h2>
              <div className='label_description'>{currentDate}</div>
            </div>
            <div className={cl.openedEventContent}>
              <AppLocation 
                location={event.location}
                address={event.address}
                eventCords={event.coords}
                eventColor={event.placemark}
              />
              <div className={cl.openedEventInputs}>
                <EventUsers usersAvatars={event.activeUsers} currentUsers={totalActiveUsers} users={event.totalUsers}/>
                <EventPrice price={event.contribution}/>
              </div>
            </div>
          </div>
          <div className={cl.openedEventBtns}>
            {activeEvent
            ? <MainButton onClick={handleEnter}>Покинуть</MainButton>
            : 
              <>
                {totalActiveUsers === event.totalUsers
                  ? <></>
                  : <MainButton onClick={handleEnter}>Присоединиться</MainButton>
                }
              </>
            }
            <SecondButton onClick={() => setIsOpen(false)}>Назад</SecondButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  )
}

export default OpenedEvent