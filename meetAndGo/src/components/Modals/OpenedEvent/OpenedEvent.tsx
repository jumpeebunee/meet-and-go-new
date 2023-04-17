import { IonContent, IonModal } from '@ionic/react'
import React, { FC, useEffect, useState } from 'react'
import cl from './OpenedEvent.module.scss'
import { IEvent } from '../../../types/types';
import MainButton from '../../UI/MainButton/MainButton';
import SecondButton from '../../UI/SecondButton/SecondButton';
import AppLocation from '../../UI/AppLocation/AppLocation';
import EventUsers from '../../UI/EventUsers/EventUsers';
import EventPrice from '../../UI/EventPrice/EventPrice';
import { arrayRemove, arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useSelector } from 'react-redux';
import { user } from '../../../app/feautures/userSlice';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';

interface OpenedEventProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  setIsUsersOpen: (arg: boolean) => void;
  event: IEvent;
}

const OpenedEvent:FC<OpenedEventProps> = ({isOpen, setIsOpen, setIsUsersOpen, event}) => {
  
  const currentDate = new Date(event.date).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'});
  const currentUser = useSelector(user);

  const [activeEvent, setActiveEvent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const isActive = event.activeUsers.find(user => user.id === currentUser.uid);
      if (isActive) {
        setActiveEvent(true);
      } else {
        setActiveEvent(false);
      }
    }
  }, [isOpen])

  const handleEnter = async() => {
    const eventRef = doc(db, "events", event.id);
    const userRef = doc(db, "users", currentUser.uid);

    setIsLoading(true);
    setIsError('');

    try {
      await updateDoc(eventRef, {
        activeUsers: arrayUnion({id: currentUser.uid, image: currentUser.image}),
      });
      await updateDoc(userRef, {
        activeMeets: arrayUnion(event.id),
      });
      setIsOpen(false);
    } catch (error) {
      setIsError('Что-то пошло не так :(');
    } finally {
      setIsLoading(false);
    }
  }

  const handleLeave = async() => {
    const eventRef = doc(db, "events", event.id);
    const userRef = doc(db, "users", currentUser.uid);

    setIsLoading(true);
    setIsError('');

    try {
      if (event.leader === currentUser.uid) {
        for (let user of event.activeUsers) {
          const ref = doc(db, "users", user.id);
          await updateDoc(ref, {activeMeets: arrayRemove(event.id)});
        }
        await deleteDoc(doc(db, "events", event.id));
      } else {
        await updateDoc(eventRef, {
          activeUsers: arrayRemove({id: currentUser.uid, image: currentUser.image}),
        });
      }
      await updateDoc(userRef, {
        activeMeets: arrayRemove(event.id),
      })
      setIsOpen(false);
    } catch (error) {
      setIsError('Что-то пошло не так :(');
    } finally {
      setIsLoading(false);
    }
  }

  const totalActiveUsers = (event.activeUsers) ? event.activeUsers.length : null;

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
                <EventUsers handle={() => setIsUsersOpen(true)} usersAvatars={event.activeUsers} currentUsers={totalActiveUsers} users={event.totalUsers}/>
                <EventPrice price={event.contribution}/>
              </div>
            </div>
            {isError && <ErrorMessage>{isError}</ErrorMessage>}
          </div>
          <div className={cl.openedEventBtns}>
            {activeEvent
            ? <MainButton disabled={isLoading} onClick={handleLeave}>Покинуть</MainButton>
            : 
              <>
                {totalActiveUsers === event.totalUsers
                  ? <></>
                  : <MainButton disabled={isLoading} onClick={handleEnter}>Присоединиться</MainButton>
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