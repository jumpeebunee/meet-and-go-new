import { FC, useState } from 'react'
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
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

interface CreateEventProps {
  isOpen: boolean;
  eventCords: number[];
  setIsOpen: (arg: boolean) => void;
}

const MAX_STAGES = 3;

const CreateEvent:FC<CreateEventProps> = ({isOpen, setIsOpen, eventCords}) => {

  const [createStage, setCreateStage] = useState(3);
  const [eventName, setEventName] = useState('Игра в майнкрафт');
  const [eventDate, setEventDate] = useState("2023-04-25T19:39:00"); // getIsoDate()
  const [eventLocation, setEventLocation] = useState('Устричный бар - Lure Oystebar');
  const [eventAddress, setEventAddress] = useState('ул.Пятницкая, 2/38, Москва');
  const [eventPrice, setEventPrice] = useState('2000');
  const [eventUsers, setEventUsers] = useState(20);
  const [isError, setIsError] = useState('');

  const currentUser = useSelector(user);

  const handleClose = () => {
    setCreateStage(1);
    setIsOpen(false);
  }

  const handleCreate = async() => {
    const eventId = nanoid();
    const userEvent = {
      id: eventId,
      leader: currentUser.uid,
      title: eventName,
      location: eventLocation,
      address: eventAddress,
      date: eventDate,
      totalUsers: eventUsers,
      contribution: eventPrice,
      coords: eventCords,
      activeUsers: [currentUser.uid]
    }
    await setDoc(doc(db, "events", eventId), userEvent);
    handleClear();
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

  const checkValidity = () => {
    const validName = /^[а-яА-ЯёЁ\s]{3,20}$/.test(eventName.trim());
    const validLocation = /^[а-яА-ЯёЁ\s]{3,20}$/.test(eventLocation.trim());
    const validDate = new Date(eventDate).getTime() > Date.now();
    const validAddress = /^[a-zA-Zа-яА-ЯёЁ\s]{3,40}$/.test(eventAddress.trim());

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
                  eventAddress={eventAddress}
                />
              </>
            }
          </div>
          <div className={cl.createEventButtons}>
            {createStage === 3
            ? <MainButton onClick={handleCreate}>Создать</MainButton>
            : <MainButton onClick={checkValidity}>Продолжить</MainButton>
            }
            {createStage > 1 
            ? <SecondButton onClick={() => setCreateStage(prev => prev - 1)}>Назад</SecondButton>
            : <SecondButton onClick={handleClose}>Отменить</SecondButton>
            }
          </div>
        </div>
      </IonContent>
    </IonModal>
  )
}

export default CreateEvent