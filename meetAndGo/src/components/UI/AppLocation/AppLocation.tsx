import { YMaps, Map } from "@pbe/react-yandex-maps"
import { API_KEY, MAP_CENTER } from "../../../data/yamapsApi"
import cl from './AppLocation.module.scss'
import { FC } from "react"

interface AppLocationProps {
  eventCords: number[];
}

const AppLocation:FC<AppLocationProps> = ({eventCords}) => {

  console.log(eventCords)

  return (
    <div>
      <label className="label">Локация</label>
      <div className="label_description">Устричный бар - Lure Oystebar</div>
      <YMaps query={{apikey: API_KEY}}>
        <div className={cl.AppLocationWrapper}>
          <Map className={cl.AppLocationMap} defaultState={{...MAP_CENTER, center: eventCords}}/>
        </div>
      </YMaps>
      <div className="label_description">ул.Пятницкая, 2/38, Москва</div>
    </div>
  )
}

export default AppLocation