import { Map, Placemark,YMaps } from "@pbe/react-yandex-maps";
import { FC } from "react";

import { API_KEY, getMapAppMark,MAP_CENTER } from "../../../data/yamapsApi";
import cl from "./AppLocation.module.scss";

interface AppLocationProps {
  eventCords: number[];
  location: string;
  address: string;
  eventColor: number;
}

const AppLocation: FC<AppLocationProps> = ({
  eventCords,
  eventColor,
  location,
  address,
}) => {
  return (
    <div>
      <label className="body-l">Локация</label>
      <div className={`body-s ${cl.Subtitle} ${cl.Location}`}>{location}</div>

      <YMaps query={{ apikey: API_KEY }}>
        <div className={cl.AppLocationWrapper}>
          <Map
            className={cl.AppLocationMap}
            defaultState={{ ...MAP_CENTER, center: eventCords }}
          >
            <Placemark
              options={getMapAppMark(eventColor)}
              geometry={eventCords}
            />
          </Map>
        </div>
      </YMaps>

      <div className={`body-s ${cl.Subtitle} ${cl.Address}`}>{address}</div>
    </div>
  );
};

export default AppLocation;
