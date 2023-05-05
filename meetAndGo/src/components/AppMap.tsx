import {
  GeolocationControl,
  Map,
  SearchControl,
  YMaps,
} from "@pbe/react-yandex-maps";
import { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCoords } from "../app/feautures/createEventSlice";
import { events } from "../app/feautures/eventsSlice";
import { changeOpened } from "../app/feautures/openedEventSlice";
import { userImage } from "../app/feautures/userSlice";
import { API_KEY, MAP_CENTER } from "../data/yamapsApi";
import cl from "../styles/AppMap.module.scss";
import { IEvent } from "../types/types";
import AppPlacemark from "./AppPlacemark";
import EventsButton from "./EventsButton";
import ProfileButton from "./ProfileButton";

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
    dispatch(changeCoords(e.get("coords")));
  };

  const openEvent = (event: IEvent) => {
    setIsOpenEvent(true);
    dispatch(changeOpened(event));
  };

  const windowHeight = useRef(window.innerHeight);
  const windowWidth = useRef(window.innerWidth);

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
        {true && (
          <div>
            <GeolocationControl
              options={{
                position: { bottom: windowHeight.current / 2 - 20, left: 20 },
              }}
            />
            <SearchControl
              options={{
                size: "small",
                position: { bottom: windowHeight.current / 2 + 25, left: 20 },
              }}
            />
          </div>
        )}
      </Map>
      {true && (
        <div>
          <EventsButton handle={() => setIsEventsOpen(true)} />
          <ProfileButton image={image} setIsProfileOpen={setIsProfileOpen} />
        </div>
      )}
      {/* <SearchButton 
        isSearch={isSearch}
        setIsSearch={setIsSearch}
      /> */}
    </YMaps>
  );
};

export default AppMap;
