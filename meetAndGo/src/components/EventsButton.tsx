import { FC } from 'react'
import cl from '../styles/eventsButton.module.scss'

interface EventsButtonProps {
  handle: Function;
}

const EventsButton:FC<EventsButtonProps> = ({handle}) => {
  return (
    <button onClick={() => handle()} className={cl.eventsButton}>
      <span></span>
    </button>
  )
}

export default EventsButton