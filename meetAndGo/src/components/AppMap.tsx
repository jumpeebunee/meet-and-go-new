import { YMaps, Map, GeolocationControl, SearchControl } from '@pbe/react-yandex-maps'
import { API_KEY, MAP_CENTER } from '../data/yamapsApi'
import cl from '../styles/AppMap.module.scss'
import EventsButton from './EventsButton'
import SearchButton from './SearchButton'
import ProfileButton from './ProfileButton'
import { FC, useMemo, useState } from 'react'
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

  const [isSearch, setIsSearch] = useState(true);

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
        {!isSearch &&
          <div>
            <GeolocationControl classname="asd" options={{ float: "left", position: {top: 40, left: 30}}}/>
            <SearchControl options={{ size: 'medium', float: "right", position: {top: 40, right: 30}}} />
          </div>
        }
      </Map>
      {isSearch
        &&
        <div>
          <EventsButton handle={() => setIsEventsOpen(true)}/>
          <ProfileButton 
            image={image}
            setIsProfileOpen={setIsProfileOpen}
          />
        </div>
      }
      <SearchButton 
        isSearch={isSearch}
        setIsSearch={setIsSearch}
      />
    </YMaps>
  )
}

export default AppMap