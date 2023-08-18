import React, { FC } from 'react'

import { IEvent } from '../../../types/types'
import EventItem from '../EventItem/EventItem';
import cl from './TotalEvents.module.scss'

interface TotalEventsListProps {
  events: IEvent[];
  setIsOpenEvent: (arg: boolean) => void;
}

const TotalEventsList:FC<TotalEventsListProps> = ({events, setIsOpenEvent}) => {
  if (events.length > 0) {
    return (
      <ul className={cl.TotalEventList}>
        {events.map(event => 
          <EventItem
            setIsOpenEvent={setIsOpenEvent}
            event={event}
            key={event.id}
          />  
        )}
      </ul>
    )
  } else {
    return (
      <div className={cl.TotalEventNot}>У вас еще нет активных событий</div>
    )
  }
}

export default TotalEventsList