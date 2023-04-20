import { IonContent, IonModal } from '@ionic/react'
import React, { FC, useEffect, useState } from 'react'
import cl from './OpenedEvent.module.scss'
import { IEvent } from '../../../types/types';
import MainButton from '../../UI/MainButton/MainButton';
import SecondButton from '../../UI/SecondButton/SecondButton';
import AppLocation from '../../UI/AppLocation/AppLocation';
import EventUsers from '../../UI/EventUsers/EventUsers';
import EventPrice from '../../UI/EventPrice/EventPrice';
import { arrayRemove, arrayUnion, deleteDoc, doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../../../app/feautures/userSlice';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';
import { unactiveEvents } from '../../../helpers/unactiveEvents';
import { changeOpened, openedEvent } from '../../../app/feautures/openedEventSlice';

interface OpenedEventProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  setIsUsersOpen: (arg: boolean) => void;
}

const OpenedEvent:FC<OpenedEventProps> = ({isOpen, setIsOpen, setIsUsersOpen}) => {
  
  const dispatch = useDispatch();
  const currentUser = useSelector(user);
  const event = useSelector(openedEvent);

  const [activeEvent, setActiveEvent] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const currentDate = new Date(event.date).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'});

  useEffect(() => {
    if (isOpen) {
      const isActive = event.activeUsers.find(user => user.id === currentUser.uid);

      const isValid = checkIsValid();
      if (!isValid) {
        setIsLoading(false);
        setIsEnded(false);
        setIsError('');
        return;
      }

      if (isActive) {
        setActiveEvent(true);
      } else {
        setActiveEvent(false);
      }
    } else {
      dispatch(changeOpened({} as IEvent));
    }
  }, [isOpen])

  const checkIsValid = () => {
    const eventDate = new Date(event.date).getTime();

    if (eventDate - Date.now() < 0) {
      unactiveEvents(event);
      setIsError('Событие завершилось.');
      setIsEnded(true);
      return false;
    } 
    return true;
  }

  const handleEnter = async() => {
    const eventRef = doc(db, "events", event.id);
    const userRef = doc(db, "users", currentUser.uid);

    setIsLoading(true);
    setIsError('');

    const isValid = checkIsValid();
    if (!isValid) {
      setIsLoading(false);
      setIsEnded(false);
      setIsError('');
      return;
    }

    try {
      await updateDoc(eventRef, {
        activeUsers: arrayUnion(
          {
            id: currentUser.uid,
            image: currentUser.image,
            reputation: currentUser.reputation
          }
        ),
      });
      await updateDoc(userRef, {
        totalMeets: increment(1),
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

    const isValid = checkIsValid();
    if (!isValid) {
      setIsLoading(false);
      setIsEnded(false);
      setIsError('');
      return;
    }

    try {
      if (event.leader === currentUser.uid) {
        for (let user of event.activeUsers) {
          const ref = doc(db, "users", user.id);
          await updateDoc(ref, {activeMeets: arrayRemove(event.id), createdMeets: currentUser.createdMeets - 1,});
        }
        await deleteDoc(doc(db, "events", event.id));
      } else {
        await updateDoc(eventRef, {
          activeUsers: arrayRemove({id: currentUser.uid, image: currentUser.image, reputation: currentUser.reputation}),
        });
        await updateDoc(doc(db, "users", currentUser.uid), {totalMeets: currentUser.totalMeets - 1})
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
            {isError && <ErrorMessage styles={{marginTop: 15}}>{isError}</ErrorMessage>}
          </div>
          <div className={cl.openedEventBtns}>
            {activeEvent
            ? <MainButton disabled={isLoading || isEnded} onClick={handleLeave}>Покинуть</MainButton>
            : 
              <>
                {(totalActiveUsers === event.totalUsers)
                  ? <></>
                  : <MainButton disabled={isLoading || isEnded} onClick={handleEnter}>Присоединиться</MainButton>
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