import { Placemark } from "@pbe/react-yandex-maps";
import { FC } from "react";
import { getMapAppMark } from "../data/yamapsApi";
import { IEvent } from "../types/types";

interface AppPlacemarkProps {
  openEvent: (event: IEvent) => void;
  event: IEvent;
}

const AppPlacemark: FC<AppPlacemarkProps> = ({ openEvent, event }) => {
  return (
    <Placemark
      onClick={() => openEvent(event)}
      options={getMapAppMark(event.placemark)}
      geometry={event.coords}
    />
  );
};

export default AppPlacemark;
