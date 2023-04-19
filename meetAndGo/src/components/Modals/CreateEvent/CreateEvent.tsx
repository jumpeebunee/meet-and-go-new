import { FC, useState } from 'react'
import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import { IonContent, IonModal } from '@ionic/react';
import { validateAddressInput, validateLocationInput, validateNameInput } from '../../../helpers/validateInput';
import { nanoid } from '@reduxjs/toolkit';
import { user } from '../../../app/feautures/userSlice';
import { arrayUnion, doc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { changeError, clearState, address, color, users, price, coords } from "../../../app/feautures/createEventSlice";
import { name, date, location } from "../../../app/feautures/createEventSlice";
import { stage } from '../../../app/feautures/createEventSlice';
import { changeStage } from '../../../app/feautures/createEventSlice';
import CreateEventBtns from './CreateEventBtns';
import CreateEventStages from './CreateEventStages';

interface CreateEventProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const CreateEvent:FC<CreateEventProps> = ({isOpen, setIsOpen}) => {

  const eventName = useSelector(name);
  const eventDate = useSelector(date);
  const eventLocation = useSelector(location);
  const eventAddress = useSelector(address);
  const eventColor = useSelector(color);
  const eventUsers = useSelector(users);
  const eventPrice = useSelector(price);
  const eventCoords = useSelector(coords);
  const currentUser = useSelector(user);
  const createStage = useSelector(stage);
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

    try {
      const eventId = nanoid();
      const userEvent = {
        id: eventId,
        placemark: eventColor,
        leader: currentUser.uid,
        title: eventName,
        location: eventLocation,
        address: eventAddress,
        date: eventDate,
        totalUsers: eventUsers,
        contribution: eventPrice,
        coords: eventCoords,
        activeUsers: [{id: currentUser.uid, image: currentUser.image, reputation: currentUser.reputation}]
      }
      await setDoc(doc(db, "events", eventId), userEvent);
      await updateDoc(doc(db, "users", currentUser.uid), {
        createdMeets: increment(1),
        activeMeets: arrayUnion(eventId)
      })
      console.log(userEvent)
      handleClose();
    } catch (error) {
      dispatch(changeError('Ошибка при создании события'));
    } finally {
      setIsLoading(false);
    }
  }

  const changeEventStage = () => {
    if (isLoading) return;
    dispatch(changeStage(createStage - 1));
  }

  const checkValidity = () => {
    const validName = /^[а-яА-ЯёЁ\s]{3,20}$/.test(eventName.trim());
    const validLocation = /^[а-яА-ЯёЁ\s]{3,20}$/.test(eventLocation.trim());
    const validDate = new Date(eventDate).getTime() > Date.now();
    const validAddress = /^[a-zA-Zа-яА-ЯёЁ\s]{3,40}$/.test(eventAddress.trim());

    dispatch(changeError(''));

    if (createStage === 1) {
      if (!validName) {
        dispatch(changeError(validateNameInput(eventName.trim())));
      } else if (!validLocation) {
        dispatch(changeError(validateLocationInput(eventLocation.trim())));
      } else if (!validDate) {
        dispatch(changeError('Неверная дата события'));
      } else {
        dispatch(changeError(''));
        dispatch(changeStage(createStage + 1));
      }
    } else if (createStage === 2) { 
      if (validAddress) {
        dispatch(changeStage(createStage + 1));
      } else {
        dispatch(changeError(validateAddressInput(eventAddress.trim())));
      }
    }
    
  }

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${cl.createEventContent}`}>
          <CreateEventStages/>
          <CreateEventBtns
            changeEventStage={changeEventStage}
            checkValid={checkValidity}
            handleClose={handleClose}
            createEvent={handleCreate}
          />
        </div>
      </IonContent>
    </IonModal>
  )
}

export default CreateEvent