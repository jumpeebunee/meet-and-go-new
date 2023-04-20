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
}

const CreateEventBtns:FC<CreateEventBtns> = ({checkValid, handleClose, changeEventStage, createEvent}) => {

  const fullEvent = useSelector(eventData);

  return (
    <div className={cl.createEventButtons}>
      {fullEvent.stage === 3
      ? <MainButton onClick={createEvent}>Создать</MainButton>
      : <MainButton onClick={checkValid}>Продолжить</MainButton>
      }
      {fullEvent.stage > 1 
      ? <SecondButton onClick={changeEventStage}>Назад</SecondButton>
      : <SecondButton onClick={handleClose}>Отменить</SecondButton>
      }
    </div>
  )
}

export default CreateEventBtns