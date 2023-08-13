import {
  YMaps,
  Map,
  GeolocationControl,
  SearchControl,
} from "@pbe/react-yandex-maps";
import { API_KEY, MAP_CENTER } from "../data/yamapsApi";
import cl from "../styles/AppMap.module.scss";
import EventsButton from "./EventsButton";
import SearchButton from "./SearchButton";
import ProfileButton from "./ProfileButton";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { events } from "../app/feautures/eventsSlice";
import { userImage } from "../app/feautures/userSlice";
import { IEvent } from "../types/types";
import AppPlacemark from "./AppPlacemark";
import { useDispatch } from "react-redux";
import { changeCoords, changeDate } from "../app/feautures/createEventSlice";
import { changeOpened } from "../app/feautures/openedEventSlice";
import { getIsoDate } from "../helpers/getIsoDate";

interface AppMapProps {
  setIsProfileOpen: (arg: boolean) => void;
  setIsCreateEventOpen: (arg: boolean) => void;
  setIsOpenEvent: (arg: boolean) => void;
  setIsEventsOpen: (arg: boolean) => void;
}

const AppMap: FC<AppMapProps> = ({
  setIsProfileOpen,
  setIsCreateEventOpen,
  setIsOpenEvent,
  setIsEventsOpen,
}) => {
  const dispatch = useDispatch();
  const image = useSelector(userImage);
  const currentEvents = useSelector(events);

  const [isSearch, setIsSearch] = useState(true);

  const createEvent = (e: any) => {
    setIsCreateEventOpen(true);

    dispatch(changeDate(getIsoDate(true)));
    dispatch(changeCoords(e.get("coords")));
  };

  const openEvent = (event: IEvent) => {
    setIsOpenEvent(true);
    dispatch(changeOpened(event));
  };

  return (
    <YMaps query={{ apikey: API_KEY }}>
      <Map
        onClick={(e: any) => createEvent(e)}
        className={cl.appMap}
        defaultState={MAP_CENTER}
        options={{
          restrictMapArea: [
            [85.23618, -178.9],
            [-73.87011, 181],
          ],
        }}
      >
        {currentEvents.map((event) => (
          <AppPlacemark key={event.id} event={event} openEvent={openEvent} />
        ))}
        {!isSearch && (
          <div>
            <GeolocationControl
              options={{ float: "left", position: { top: 40, left: 30 } }}
            />
            <SearchControl
              options={{
                size: "medium",
                float: "right",
                position: { top: 40, right: 30 },
              }}
            />
          </div>
        )}
      </Map>
      {isSearch && (
        <div>
          <EventsButton handle={() => setIsEventsOpen(true)} />
          <ProfileButton image={image} setIsProfileOpen={setIsProfileOpen} />
        </div>
      )}
      <SearchButton isSearch={isSearch} setIsSearch={setIsSearch} />
    </YMaps>
  );
};

export default AppMap;
