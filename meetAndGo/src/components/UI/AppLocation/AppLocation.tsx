import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { API_KEY, MAP_CENTER, getMapAppMark } from "../../../data/yamapsApi";
import cl from "./AppLocation.module.scss";
import { FC } from "react";

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
