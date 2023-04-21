import { IonContent, IonModal } from '@ionic/react'
import React, { FC, useEffect, useState } from 'react'
import cl from './OpenedEvent.module.scss'
import { IEvent } from '../../../types/types';
import MainButton from '../../UI/MainButton/MainButton';
import SecondButton from '../../UI/SecondButton/SecondButton';
import { arrayRemove, arrayUnion, deleteDoc, doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../../../app/feautures/userSlice';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';
import { unactiveEvents } from '../../../helpers/unactiveEvents';
import { changeOpened, openedEvent } from '../../../app/feautures/openedEventSlice';
import OpenedEventHeader from './OpenedEventHeader';
import OpenedEventContent from './OpenedEventContent';
import OpenedEventButtons from './OpenedEventButtons';

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

  const removeEvent = async() => {
    setIsLoading(true);
    setIsError('');

    try {
      for (let user of event.activeUsers) {
        const ref = doc(db, "users", user.id);
        await updateDoc(ref, {activeMeets: arrayRemove(event.id)});
      }
      await deleteDoc(doc(db, "events", event.id));
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
          {currentUser.role === 'ADMIN' && <button onClick={removeEvent} className={cl.openedEventRemove}><span></span></button>}
          <div>
            <OpenedEventHeader
              title={event.title}
              date={currentDate}
            />
            <OpenedEventContent
              totalActiveUsers={totalActiveUsers}
              setIsUsersOpen={setIsUsersOpen}
            />
            {isError && <ErrorMessage styles={{marginTop: 15}}>{isError}</ErrorMessage>}
          </div>
          <OpenedEventButtons
            activeEvent={activeEvent}
            isLoading={isLoading}
            isEnded={isEnded}
            handleLeave={handleLeave}
            handleEnter={handleEnter}
            setIsOpen={setIsOpen}
            totalActiveUsers={totalActiveUsers}
            totalUsers={event.totalUsers}
          />
        </div>
      </IonContent>
    </IonModal>
  )
}

export default OpenedEvent