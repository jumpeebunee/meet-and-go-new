import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import MainButton from '../../UI/MainButton/MainButton';
import SecondButton from '../../UI/SecondButton/SecondButton';
import { useSelector} from 'react-redux';
import { eventData } from '../../../app/feautures/createEventSlice';
import { FC } from 'react';

interface CreateEventBtns {
  checkValid: () => void;
  handleClose: () => void;
  changeEventStage: () => void;
  createEvent: () => void;
  isLoading: boolean;
}

const CreateEventBtns:FC<CreateEventBtns> = ({isLoading, checkValid, handleClose, changeEventStage, createEvent}) => {

  const fullEvent = useSelector(eventData);

  return (
    <div className={cl.createEventButtons}>
      {fullEvent.stage === 3
      ? <MainButton disabled={isLoading} onClick={createEvent}>Создать</MainButton>
      : <MainButton disabled={isLoading} onClick={checkValid}>Продолжить</MainButton>
      }
      {fullEvent.stage > 1 
      ? <SecondButton disabled={isLoading} onClick={changeEventStage}>Назад</SecondButton>
      : <SecondButton disabled={isLoading} onClick={handleClose}>Отменить</SecondButton>
      }
    </div>
  )
}

export default CreateEventBtns