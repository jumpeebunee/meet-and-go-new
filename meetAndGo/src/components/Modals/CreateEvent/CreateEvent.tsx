import { FC, useState } from 'react'
import MainButton from '../../UI/MainButton/MainButton';
import SecondButton from '../../UI/SecondButton/SecondButton';
import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import FirstStageEvent from './FirstStageEvent';
import { IonContent, IonDatetime, IonModal } from '@ionic/react';
import { getIsoDate } from '../../../helpers/getIsoDate';
import { format } from 'date-fns';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';

interface CreateEventProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const MAX_STAGES = 3;

const CreateEvent:FC<CreateEventProps> = ({isOpen, setIsOpen}) => {

  const [createStage, setCreateStage] = useState(1);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(getIsoDate());
  const [eventLocation, setEventLocation] = useState('');
  const [isError, setIsError] = useState('');

  const handleClose = () => {
    setCreateStage(1);
    setIsOpen(false);
  }

  const checkValidity = () => {
    const validName = /^[а-яА-ЯёЁ\s]{3,20}$/.test(eventName);
    const validLocation = /^[а-яА-ЯёЁ\s]{3,20}$/.test(eventLocation);
    const validDate = new Date(eventDate).getTime() > Date.now();

    if (createStage === 1) {
      if (!validName) {
        setIsError('Неккоректное название события');
      } else if (!validLocation) {
        setIsError('Неккоректная локация события ');
      } else if (!validDate) {
        setIsError('Неверная дата события');
      } else {
        setIsError('');
        setCreateStage(prev => prev += 1);
      }
    }
    
  }

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${cl.createEventContent}`}>
          <div>
            <div className={cl.createEventStages}><span>{createStage}</span>/{MAX_STAGES}</div>
            <h2 className={cl.createEventHeading}>Создать новое событие</h2>
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
            {createStage === 2 && <div>Ничего тут нету</div>}
            {createStage === 3 && <div>Подтверждение эвента</div>}
          </div>
          <div className={cl.createEventButtons}>
            <MainButton onClick={checkValidity}>Продолжить</MainButton>
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