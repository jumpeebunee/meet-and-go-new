import { FC, useState } from 'react'
import AppModal from '../../UI/AppModal/AppModal';
import MainButton from '../../UI/MainButton/MainButton';
import SecondButton from '../../UI/SecondButton/SecondButton';
import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import FirstStageEvent from './FirstStageEvent';
import { IonModal } from '@ionic/react';

interface CreateEventProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const MAX_STAGES = 3;

const CreateEvent:FC<CreateEventProps> = ({isOpen, setIsOpen}) => {

  const [createStage, setCreateStage] = useState(1);

  const [eventName, setEventName] = useState('');

  const handleClose = () => {
    setCreateStage(1);
    setIsOpen(false);
  }

  return (
    <IonModal isOpen={isOpen}>
      <div className={`modal-container ${cl.createEventContent}`}>
        <div>
          <div className={cl.createEventStages}><span>{createStage}</span>/{MAX_STAGES}</div>
          {createStage === 1 
            && 
            <FirstStageEvent
              eventName={eventName}
              setEventName={setEventName}
            />
          }
          {createStage === 2 && <div>Информация о эвенте</div>}
          {createStage === 3 && <div>Подтверждение эвента</div>}
        </div>
        <div className={cl.createEventButtons}>
          <MainButton onClick={() => setCreateStage(prev => prev + 1)}>Продолжить</MainButton>
          <SecondButton onClick={handleClose}>Отменить</SecondButton>
        </div>
      </div>
    </IonModal>
    // <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
    //   <div className={`modal-container ${cl.createEventContent}`}>
    //     <div>
    //       <div className={cl.createEventStages}><span>{createStage}</span>/{MAX_STAGES}</div>
    //       {createStage === 1 
    //         && 
    //         <FirstStageEvent
    //           eventName={eventName}
    //           setEventName={setEventName}
    //         />
    //       }
    //       {createStage === 2 && <div>Информация о эвенте</div>}
    //       {createStage === 3 && <div>Подтверждение эвента</div>}
    //     </div>
    //     <div className={cl.createEventButtons}>
    //       <MainButton onClick={() => setCreateStage(prev => prev + 1)}>Продолжить</MainButton>
    //       <SecondButton onClick={handleClose}>Отменить</SecondButton>
    //     </div>
    //   </div>
    // </AppModal>
  )
}

export default CreateEvent