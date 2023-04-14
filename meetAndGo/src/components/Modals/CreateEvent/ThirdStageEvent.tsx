import React, { FC } from 'react'
import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import AppLocation from '../../UI/AppLocation/AppLocation';
import EventUsers from '../../UI/EventUsers/EventUsers';

interface ThirdStageProps {
  eventName: string;
  eventDate: string;
  eventUsers: number;
  eventCords: number[];
}

const ThirdStageEvent:FC<ThirdStageProps> = ({eventName, eventUsers, eventDate, eventCords}) => {

  const currentDate = new Date(eventDate).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'});

  return (
    <div>
      <h2 className={cl.createEventHeading}>{eventName}</h2>
      <div style={{marginTop: 5, marginBottom: 30}} className='label_description'>{currentDate}</div>
      <AppLocation eventCords={eventCords}/>
      <EventUsers style={{marginTop: 25}} users={eventUsers}/>
    </div>
  )
}

export default ThirdStageEvent