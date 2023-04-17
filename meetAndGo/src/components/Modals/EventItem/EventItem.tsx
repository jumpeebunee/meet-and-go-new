import { FC } from 'react'
import cl from './EventItem.module.scss'

interface EventItemProps {
  title: string;
  address: string;
  location: string;
}

const EventItem:FC<EventItemProps> = ({title, address, location}) => {
  return (
    <li className={cl.EventItem}>
      <h3>{title}</h3>
      <div className={cl.EventItemContent}>
        <p>{location}</p>
        <p>{address}</p>
      </div>
    </li>
  )
}

export default EventItem