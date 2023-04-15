import React, { FC } from 'react'
import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import AppLocation from '../../UI/AppLocation/AppLocation';
import EventUsers from '../../UI/EventUsers/EventUsers';
import EventPrice from '../../UI/EventPrice/EventPrice';

interface ThirdStageProps {
  eventName: string;
  eventDate: string;
  eventUsers: number;
  eventCords: number[];
  eventPrice: string;
  eventAddress: string;
  eventLocation: string;
  isLoading: boolean;
}

const ThirdStageEvent:FC<ThirdStageProps> = ({eventName, eventPrice, eventUsers, eventDate, eventCords, eventLocation, eventAddress, isLoading}) => {

  const currentDate = new Date(eventDate).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'});

  return (
    <div>
      <div className={cl.createEventThirdHeader}>
        <h2 className={cl.createEventHeading}>{eventName}</h2>
        <div className='label_description'>{currentDate}</div>
      </div>
      <AppLocation location={eventLocation} address={eventAddress} eventCords={eventCords}/>
      <div className={cl.createEventThirdContent}>
        <EventUsers users={eventUsers}/>
        <EventPrice price={eventPrice}/>
      </div>
    </div>
  )
}

export default ThirdStageEvent