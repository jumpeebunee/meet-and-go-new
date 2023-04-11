import { FC } from 'react'
import cl from '@/styles/CreateEventModal/createEvent.module.scss';

const BASE_EVENT_NAMES = [
  {
    id: 1,
    value: 'Баскетбол',
    title: 'баскетбол',
  },
  {
    id: 2,
    value: 'Волейбол',
    title: 'волейбол',
  },
  {
    id: 3,
    value: 'Теннис',
    title: 'теннис',
  },
  {
    id: 4,
    value: 'Бег',
    title: 'бег',
  },
  {
    id: 5,
    value: 'Вечеринка',
    title: 'вечеринка',
  },
]

interface EventNamesListProps {
  setName: (name: string) => void;
}

const EventNamesList:FC<EventNamesListProps> = ({setName}) => {
  return (
    <ul className={cl.createEventNamesList}>
      {BASE_EVENT_NAMES.map(event => 
        <li className={cl.createEventNamesItem} key={event.id}>
          <button onClick={() => setName(event.value)}>{event.title}</button>
        </li>
      )}
    </ul>
  )
}

export default EventNamesList