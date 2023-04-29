import { FC, useState } from 'react'
import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import { IonContent, IonModal } from '@ionic/react';
import { validateAddressInput, validateLocationInput, validateNameInput } from '../../../helpers/validateInput';
import { nanoid } from '@reduxjs/toolkit';
import { user } from '../../../app/feautures/userSlice';
import { arrayUnion, doc, increment, setDoc, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { changeError, clearState, eventData } from "../../../app/feautures/createEventSlice";
import { changeStage } from '../../../app/feautures/createEventSlice';
import CreateEventBtns from './CreateEventBtns';
import CreateEventStages from './CreateEventStages';
import AppEventsLimit from '../../AppEventsLimit';
import { errorOptions } from '../../../data/errorsOptions';
import { IChat } from '../../../types/types';

interface CreateEventProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const CreateEvent:FC<CreateEventProps> = ({isOpen, setIsOpen}) => {

  const fullEvent = useSelector(eventData);
  const currentUser = useSelector(user);
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    dispatch(clearState());
    setIsOpen(false);
  }

  const handleCreate = async() => {
    if (isLoading) return;

    setIsLoading(true);
    dispatch(changeError(''));

    const validDate = new Date(fullEvent.date).getTime() > Date.now();

    if (!validDate) {
      dispatch(changeError('Неверная дата события'));
      setIsLoading(false);
      return;
    }

    try {
			const batch = writeBatch(db)
			const chatId = nanoid();
			const eventId = nanoid();

			const chatDoc: IChat = {
				id: chatId,
				userIds: [currentUser.uid],
			}
      const userEventDoc = {
        id: eventId,
        placemark: fullEvent.color,
        leader: currentUser.uid,
        title: fullEvent.name,
        location: fullEvent.location,
        address: fullEvent.address,
        date: fullEvent.date,
        totalUsers: fullEvent.users,
        contribution: fullEvent.price,
        coords: fullEvent.coords,
				chatId,
        activeUsers: [{id: currentUser.uid, image: currentUser.image, reputation: currentUser.reputation}]
      }

			batch.set(doc(db, "events", eventId), userEventDoc);
			batch.set(doc(db, "chats", chatId), chatDoc)
			batch.update(doc(db, "users", currentUser.uid), {
        createdMeets: increment(1),
        activeMeets: arrayUnion(eventId),
      });
			await batch.commit()
      handleClose();
    } catch (error) {
      dispatch(changeError('Ошибка при создании события'));
    } finally {
      setIsLoading(false);
    }
  }

  const changeEventStage = () => {
    if (isLoading) return;
    dispatch(changeStage(fullEvent.stage - 1));
  }

  const checkValidity = () => {
    const validName = /^[а-яА-ЯёЁ\s]{3,20}$/.test(fullEvent.name.trim());
    const validLocation = /^[а-яА-ЯёЁ\s]{3,20}$/.test(fullEvent.location.trim());
    const validDate = new Date(fullEvent.date).getTime() > Date.now();
    const validAddress = /[\w\s,а-яА-Я\/]{3,140}/g.test(
      fullEvent.address.trim()
    );

    dispatch(changeError(''));

    if (fullEvent.stage === 1) {
      if (!validName) {
        dispatch(changeError(validateNameInput(fullEvent.name.trim())));
      } else if (!validLocation) {
        dispatch(changeError(validateLocationInput(fullEvent.location.trim())));
      } else if (!validDate) {
        dispatch(changeError('Неверная дата события'));
      } else {
        dispatch(changeError(''));
        dispatch(changeStage(fullEvent.stage + 1));
      }
    } else if (fullEvent.stage === 2) { 
      if (validAddress) {
        dispatch(changeStage(fullEvent.stage + 1));
      } else {
        dispatch(changeError(validateAddressInput(fullEvent.address.trim())));
      }
    }  
  }

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${cl.createEventContent}`}>
          {currentUser.activeMeets?.length >= 3
          ?
            <AppEventsLimit 
              title={errorOptions.limitTitle}
              body={errorOptions.limitBody}
              setIsOpen={setIsOpen}
            />
          :
          <>
            <CreateEventStages/>
              <CreateEventBtns
                isLoading={isLoading}
                changeEventStage={changeEventStage}
                checkValid={checkValidity}
                handleClose={handleClose}
                createEvent={handleCreate}
              />
            </>
          }
        </div>
      </IonContent>
    </IonModal>
  )
}

export default CreateEvent