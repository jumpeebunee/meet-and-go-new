import { FC } from 'react'
import cl from './OpenedEvent.module.scss';
import MainButton from '../../UI/MainButton/MainButton';
import SecondButton from '../../UI/SecondButton/SecondButton';
import { useSelector } from 'react-redux';
import { openedEvent } from '../../../app/feautures/openedEventSlice';
import { user } from '../../../app/feautures/userSlice';

interface OpenedEventButtonsProps {
  activeEvent: boolean;
  isLoading: boolean;
  isEnded: boolean;
  handleLeave: () => void;
  handleEnter: () => void;
	handleOpenChat: () => void;
  setIsOpen: (isOpen: boolean) => void;
  totalActiveUsers: number | null;
  totalUsers: number;
}

const OpenedEvennttButtons:FC<OpenedEventButtonsProps> = ({activeEvent, isLoading, isEnded, handleOpenChat, handleLeave, handleEnter, setIsOpen, totalActiveUsers, totalUsers}) => {

  const {leader} = useSelector(openedEvent);
  const {uid} = useSelector(user);

  return (
    <div className={cl.openedEventBtns}>
      {activeEvent ? (
        <>
          <MainButton disabled={isLoading || isEnded} onClick={handleLeave}>
            {leader === uid ? "Удалить" : "Покинуть"}
          </MainButton>
          <MainButton disabled={isLoading || isEnded} onClick={handleOpenChat}>
            Перейти в чат
          </MainButton>
        </>
      ) : (
        <>
          {totalActiveUsers === totalUsers ? (
            <></>
          ) : (
            <MainButton disabled={isLoading || isEnded} onClick={handleEnter}>
              Присоединиться
            </MainButton>
          )}
        </>
      )}
      <SecondButton onClick={() => setIsOpen(false)}>Назад</SecondButton>
    </div>
  );
}

export default OpenedEvennttButtons;