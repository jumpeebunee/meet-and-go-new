import { FC } from 'react'
import cl from './EventItem.module.scss'
import { IEvent } from '../../../types/types'
import { useDispatch } from 'react-redux';
import { changeOpened } from '../../../app/feautures/openedEventSlice';

interface EventItemProps {
  event: IEvent;
  setIsOpenEvent: (arg: boolean) => void;
}

const EventItem:FC<EventItemProps> = ({event, setIsOpenEvent}) => {

  const dispatch = useDispatch();

  const handleOpen = () => {
    setIsOpenEvent(true);
    dispatch(changeOpened(event));
  }

  const currentDate = new Date(event.date).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'});

  return (
    <li onClick={handleOpen} className={cl.EventItem}>
      <h3>{event.title}</h3>
      <div className={cl.EventItemContent}>
        <p>{currentDate}</p>
        <p>{event.address}</p>
      </div>
    </li>
  )
}

export default EventItem