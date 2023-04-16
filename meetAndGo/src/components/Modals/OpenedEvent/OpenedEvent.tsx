import { IonContent, IonModal } from '@ionic/react'
import React, { FC } from 'react'
import cl from './OpenedEvent.module.scss'
import { IEvent } from '../../../types/types';
import MainButton from '../../UI/MainButton/MainButton';
import SecondButton from '../../UI/SecondButton/SecondButton';
import AppLocation from '../../UI/AppLocation/AppLocation';
import EventUsers from '../../UI/EventUsers/EventUsers';
import EventPrice from '../../UI/EventPrice/EventPrice';

interface OpenedEventProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  event: IEvent;
}

const OpenedEvent:FC<OpenedEventProps> = ({isOpen, setIsOpen, event}) => {
  
  const currentDate = new Date(event.date).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'});

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${cl.openedEventContainer}`}>
          <div>
            <div className={cl.openedEventHeader}>
              <h2 className={cl.openedEventHeading}>{event.title}</h2>
              <div className='label_description'>{currentDate}</div>
            </div>
            <AppLocation 
              location={event.location}
              address={event.address}
              eventCords={event.coords}
              eventColor={event.placemark}
            />
            <div className={cl.createEventThirdContent}>
              <EventUsers usersAvatars={event.activeUsers} users={event.totalUsers}/>
              <EventPrice price={event.contribution}/>
            </div>
          </div>
          <div className={cl.openedEventBtns}>
            <MainButton>Присоединиться</MainButton>
            <SecondButton onClick={() => setIsOpen(false)}>Назад</SecondButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  )
}

export default OpenedEvent