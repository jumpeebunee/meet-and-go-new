import { FC } from 'react'
import cl from './OpenedEvent.module.scss';
import MainButton from '../../UI/MainButton/MainButton';
import SecondButton from '../../UI/SecondButton/SecondButton';

interface OpenedEventButtonsProps {
  activeEvent: boolean;
  isLoading: boolean;
  isEnded: boolean;
  handleLeave: () => void;
  handleEnter: () => void;
  setIsOpen: (isOpen: boolean) => void;
  totalActiveUsers: number | null;
  totalUsers: number;
}

const OpenedEventButtons:FC<OpenedEventButtonsProps> = ({activeEvent, isLoading, isEnded, handleLeave, handleEnter, setIsOpen, totalActiveUsers, totalUsers}) => {
  return (
    <div className={cl.openedEventBtns}>
      {activeEvent
      ? <MainButton disabled={isLoading || isEnded} onClick={handleLeave}>Покинуть</MainButton>
      : 
        <>
          {(totalActiveUsers === totalUsers)
            ? <></>
            : <MainButton disabled={isLoading || isEnded} onClick={handleEnter}>Присоединиться</MainButton>
          }
        </>
      }
      <SecondButton onClick={() => setIsOpen(false)}>Назад</SecondButton>
    </div>
  )
}

export default OpenedEventButtons