import { FC, useState } from 'react'
import MainButton from '../../UI/MainButton/MainButton';
import SecondButton from '../../UI/SecondButton/SecondButton';
import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import FirstStageEvent from './FirstStageEvent';
import { IonDatetime, IonModal } from '@ionic/react';
import { getIsoDate } from '../../../helpers/getIsoDate';
import { format } from 'date-fns';

interface CreateEventProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const MAX_STAGES = 3;

const CreateEvent:FC<CreateEventProps> = ({isOpen, setIsOpen}) => {

  const [createStage, setCreateStage] = useState(1);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(getIsoDate());

  const handleClose = () => {
    setCreateStage(1);
    setIsOpen(false);
  }

  return (
    <IonModal isOpen={isOpen}>
      <div className={`modal-container ${cl.createEventContent}`}>
        <div>
          <div className={cl.createEventStages}><span>{createStage}</span>/{MAX_STAGES}</div>
          <h2 className={cl.createEventHeading}>Создать новое событие</h2>
          {createStage === 1 
            && 
            <FirstStageEvent
              eventName={eventName}
              eventDate={eventDate}
              setEventName={setEventName}
              setEventDate={setEventDate}
            />
          }
          {createStage === 2 && <div>Ничего тут нету</div>}
          {createStage === 3 && <div>Подтверждение эвента</div>}
        </div>
        <div className={cl.createEventButtons}>
          <MainButton onClick={() => setCreateStage(prev => prev + 1)}>Продолжить</MainButton>
          <SecondButton onClick={handleClose}>Отменить</SecondButton>
        </div>
      </div>
    </IonModal>
  )
}

export default CreateEvent