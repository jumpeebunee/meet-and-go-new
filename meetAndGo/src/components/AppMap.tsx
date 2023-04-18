import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import { API_KEY, MAP_CENTER, getMapAppMark } from '../data/yamapsApi'
import cl from '../styles/AppMap.module.scss'
import EventsButton from './EventsButton'
import SearchButton from './SearchButton'
import ProfileButton from './ProfileButton'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { events } from '../app/feautures/eventsSlice'
import { userImage } from '../app/feautures/userSlice'
import { IEvent } from '../types/types'
import AppPlacemark from './AppPlacemark'

interface AppMapProps {
  setIsProfileOpen: (arg: boolean) => void;
  setIsCreateEventOpen: (arg: boolean) => void;
  setIsOpenEvent: (arg: boolean) => void;
  setOpenedEvent: (arg: IEvent) => void;
  setEventCords: (arg: []) => void;
  setIsEventsOpen: (arg: boolean) => void;
}

const AppMap:FC<AppMapProps> = ({setIsProfileOpen, setIsCreateEventOpen, setEventCords, setIsOpenEvent, setOpenedEvent, setIsEventsOpen}) => {

  const image = useSelector(userImage);
  const currentEvents = useSelector(events);

  const createEvent = (e: any) => {
    setIsCreateEventOpen(true);
    setEventCords(e.get('coords'));
  }

  const openEvent = (event: IEvent) => {
    setIsOpenEvent(true);
    setOpenedEvent(event);
  }
  
  return (
    <YMaps query={{apikey: API_KEY}}>
      <Map onClick={(e: any) => createEvent(e)} className={cl.appMap} defaultState={MAP_CENTER}>
        {currentEvents.map(event => 
          <AppPlacemark
            key={event.id}
            event={event}
            openEvent={openEvent}
          />
        )}
      </Map>
      <EventsButton handle={() => setIsEventsOpen(true)}/>
      <ProfileButton image={image} setIsProfileOpen={setIsProfileOpen}/>
      <SearchButton/>
    </YMaps>
  )
}

export default AppMap