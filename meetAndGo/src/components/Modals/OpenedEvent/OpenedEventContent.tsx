import React, { FC } from 'react'
import cl from './OpenedEvent.module.scss'
import AppLocation from '../../UI/AppLocation/AppLocation'
import EventUsers from '../../UI/EventUsers/EventUsers'
import EventPrice from '../../UI/EventPrice/EventPrice'
import { useSelector } from 'react-redux'
import { openedEvent } from '../../../app/feautures/openedEventSlice'

interface OpenedEventContentProps {
  setIsUsersOpen: (arg: boolean) => void;
  totalActiveUsers: number | null;
}

const OpenedEventContent:FC<OpenedEventContentProps> = ({setIsUsersOpen, totalActiveUsers}) => {

  const event = useSelector(openedEvent);

  return (
    <div className={cl.openedEventContent}>
      <AppLocation 
        location={event.location}
        address={event.address}
        eventCords={event.coords}
        eventColor={event.placemark}
      />
      <div className={cl.openedEventInputs}>
        <EventUsers handle={() => setIsUsersOpen(true)} usersAvatars={event.activeUsers} currentUsers={totalActiveUsers} users={event.totalUsers}/>
        <EventPrice price={event.contribution}/>
      </div>
    </div>
  )
}

export default OpenedEventContent