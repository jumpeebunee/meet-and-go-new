import { FC } from 'react'
import cl from '@/styles/CreateEventModal/createEvent.module.scss';

const BASE_EVENT_NAMES = [
  {
    id: 1,
    title: 'баскетбол',
  },
  {
    id: 2,
    title: 'волейбол',
  },
  {
    id: 3,
    title: 'теннис',
  },
]

interface EventNamesListProps {

}

const EventNamesList:FC<EventNamesListProps> = () => {
  return (
    <ul className={cl.createEventNamesList}>
      {BASE_EVENT_NAMES.map(event => 
        <li className={cl.createEventNamesItem} key={event.id}>
          <button>{event.title}</button>
        </li>
      )}
    </ul>
  )
}

export default EventNamesList