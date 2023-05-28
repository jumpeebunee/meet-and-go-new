import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps"
import { API_KEY, MAP_APP_LOCATION, MAP_CENTER, getMapAppMark } from "../../../data/yamapsApi"
import cl from './AppLocation.module.scss'
import { FC } from "react"

interface AppLocationProps {
  eventCords: number[];
  location: string;
  address: string;
  eventColor: number;
}

const AppLocation:FC<AppLocationProps> = ({eventCords, eventColor, location, address}) => {

  return (
    <div>
      <label className="label">Локация</label>
      <div className="label_description">{location}</div>
      <YMaps query={{apikey: API_KEY}}>
        <div className={cl.AppLocationWrapper}>
          <Map className={cl.AppLocationMap} defaultState={{...MAP_CENTER, center: eventCords}}>
            <Placemark options={getMapAppMark(eventColor)} geometry={eventCords}/>
          </Map>
        </div>
      </YMaps>
      <div className="label_description">{address}</div>
    </div>
  )
}

export default AppLocation