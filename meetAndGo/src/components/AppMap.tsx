import { YMaps, Map } from '@pbe/react-yandex-maps'
import { API_KEY, MAP_CENTER } from '../data/yamapsApi'
import cl from '../styles/AppMap.module.scss'
import EventsButton from './EventsButton'
import SearchButton from './SearchButton'
import ProfileButton from './ProfileButton'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { userImage } from '../app/feautures/userSlice'

interface AppMapProps {
  setIsProfileOpen: (arg: boolean) => void;
  setIsCreateEventOpen: (arg: boolean) => void;
}

const AppMap:FC<AppMapProps> = ({setIsProfileOpen, setIsCreateEventOpen}) => {

  const image = useSelector(userImage);

  return (
    <YMaps query={{apikey: API_KEY}}>
      <Map onClick={() => setIsCreateEventOpen(true)} className={cl.appMap} defaultState={MAP_CENTER}/>
      <EventsButton/>
      <ProfileButton image={image} setIsProfileOpen={setIsProfileOpen}/>
      <SearchButton/>
    </YMaps>
  )
}

export default AppMap