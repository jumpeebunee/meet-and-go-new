import { FC, useEffect, useState } from 'react'
import MainButton from '../../UI/MainButton/MainButton';
import SecondButton from '../../UI/SecondButton/SecondButton';
import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import FirstStageEvent from './FirstStageEvent';
import { IonContent, IonModal } from '@ionic/react';
import { getIsoDate } from '../../../helpers/getIsoDate';;
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';
import SecondStageEvent from './SecondStageEvent';
import { validateAddressInput, validateLocationInput, validateNameInput } from '../../../helpers/validateInput';
import ThirdStageEvent from './ThirdStageEvent';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { user } from '../../../app/feautures/userSlice';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { getRandomColor } from '../../../helpers/getRandomColor';

interface CreateEventProps {
  isOpen: boolean;
  eventCords: number[];
  setIsOpen: (arg: boolean) => void;
}

const MAX_STAGES = 3;

const CreateEvent:FC<CreateEventProps> = ({isOpen, setIsOpen, eventCords}) => {

  const [createStage, setCreateStage] = useState(1);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(getIsoDate());
  const [eventLocation, setEventLocation] = useState('');
  const [eventAddress, setEventAddress] = useState('');
  const [eventPrice, setEventPrice] = useState('');
  const [eventUsers, setEventUsers] = useState(2);
  const [eventColor, setEventColor] = useState(getRandomColor());
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const currentUser = useSelector(user);

  useEffect(() => {
    // const collectionRef = app.firestore().collection('myCollection');
    // const admin = initializeApp();
    // console.log(admin)
  }, [])

  const handleClose = () => {
    setCreateStage(1);
    setIsOpen(false);
  }

  const handleCreate = async() => {
    if (isLoading) return;

    setIsLoading(true);
    setIsError('');

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
        coords: eventCords,
        activeUsers: [{id: currentUser.uid, image: currentUser.image}]
      }
      await setDoc(doc(db, "events", eventId), userEvent);
      await updateDoc(doc(db, "users", currentUser.uid), {
        activeMeets: arrayUnion(eventId)
      })
      handleClear();
    } catch (error) {
      setIsError('Ошибка при создании события');
    } finally {
      setIsLoading(false);
    }
  }

  const handleClear = () => {
    setCreateStage(1);
    setEventName('');
    setEventLocation('');
    setEventAddress('');
    setEventPrice('');
    setEventUsers(2);
    setEventDate(getIsoDate());
    setIsError('');
    setIsOpen(false);
  }

  const changeStage = () => {
    if (isLoading) return;
    setCreateStage(prev => prev - 1);
  }

  const checkValidity = () => {
    const validName = /^[а-яА-ЯёЁ\s]{3,20}$/.test(eventName.trim());
    const validLocation = /^[а-яА-ЯёЁ\s]{3,20}$/.test(eventLocation.trim());
    const validDate = new Date(eventDate).getTime() > Date.now();
    const validAddress = /^[a-zA-Zа-яА-ЯёЁ\s]{3,40}$/.test(eventAddress.trim());

    setIsError('');

    if (createStage === 1) {
      if (!validName) {
        setIsError(validateNameInput(eventName.trim()));
      } else if (!validLocation) {
        setIsError(validateLocationInput(eventLocation.trim()));
      } else if (!validDate) {
        setIsError('Неверная дата события');
      } else {
        setIsError('');
        setCreateStage(prev => prev += 1);
      }
    } else if (createStage === 2) { 
      if (validAddress) {
        setCreateStage(prev => prev + 1);
      } else {
        setIsError(validateAddressInput(eventAddress.trim()));
      }
    }
    
  }

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${cl.createEventContent}`}>
          <div>
            <div className={cl.createEventStages}><span>{createStage}</span>/{MAX_STAGES}</div>
            {createStage === 1 
              && 
              <>
                <FirstStageEvent
                  eventName={eventName}
                  eventDate={eventDate}
                  eventLocation={eventLocation}
                  setEventName={setEventName}
                  setEventDate={setEventDate}
                  setEventLocation={setEventLocation}
                />
                {isError && <ErrorMessage styles={{marginTop: 10}}>{isError}</ErrorMessage>}
              </>
              }
            {createStage === 2 
              && 
              <>
                <SecondStageEvent
                  eventCords={eventCords}
                  eventAddress={eventAddress}
                  eventUsers={eventUsers}
                  eventPrice={eventPrice}
                  setEventUsers={setEventUsers}
                  setEventAddress={setEventAddress}
                  setEventPrice={setEventPrice}
                />
                {isError && <ErrorMessage styles={{marginTop: 10}}>{isError}</ErrorMessage>}
              </>
            }
            {createStage === 3 
              &&
              <>
                <ThirdStageEvent
                  eventName={eventName}
                  eventDate={eventDate}
                  eventCords={eventCords}
                  eventUsers={eventUsers}
                  eventPrice={eventPrice}
                  eventLocation={eventLocation}
                  eventColor={eventColor}
                  eventAddress={eventAddress}
                  isLoading={isLoading}
                />
                {isError && <ErrorMessage styles={{marginTop: 10}}>{isError}</ErrorMessage>}
              </>
            }
          </div>
          <div className={cl.createEventButtons}>
            {createStage === 3
            ? <MainButton onClick={handleCreate}>Создать</MainButton>
            : <MainButton onClick={checkValidity}>Продолжить</MainButton>
            }
            {createStage > 1 
            ? <SecondButton onClick={changeStage}>Назад</SecondButton>
            : <SecondButton onClick={handleClose}>Отменить</SecondButton>
            }
          </div>
        </div>
      </IonContent>
    </IonModal>
  )
}

export default CreateEvent