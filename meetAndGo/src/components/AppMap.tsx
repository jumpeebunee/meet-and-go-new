import { YMaps, Map } from '@pbe/react-yandex-maps'
import { API_KEY, MAP_CENTER } from '../data/yamapsApi'
import cl from '../styles/AppMap.module.scss'
import EventsButton from './EventsButton'
import SearchButton from './SearchButton'
import ProfileButton from './ProfileButton'

const AppMap = () => {
  return (
    <YMaps query={{apikey: API_KEY}}>
      <Map className={cl.appMap} defaultState={MAP_CENTER}/>
      <EventsButton/>
      <ProfileButton/>
      <SearchButton/>
    </YMaps>
  )
}

export default AppMap