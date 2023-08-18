import {
  GeolocationControl,
  Map,
  SearchControl,
  YMaps,
} from "@pbe/react-yandex-maps";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { changeCoords, changeDate } from "../../app/feautures/createEventSlice";
import { events } from "../../app/feautures/eventsSlice";
import { changeOpened } from "../../app/feautures/openedEventSlice";
import { userImage } from "../../app/feautures/userSlice";
import {
  geolocationOptions,
  mapOptions,
  searchOptions,
} from "../../constants/mapOptions";
import { API_KEY, MAP_CENTER } from "../../data/yamapsApi";
import { getIsoDate } from "../../helpers/getIsoDate";
import { IEvent } from "../../types/types";
import AppPlacemark from "../AppPlacemark";
import EventsButton from "../EventsButton/EventsButton";
import ProfileButton from "../ProfileButton/ProfileButton";
import SearchButton from "../SearchButton/SearchButton";
import cl from "./AppMap.module.scss";

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
        className={cl.Map}
        defaultState={MAP_CENTER}
        options={mapOptions}
      >
        {currentEvents.map((event) => (
          <AppPlacemark key={event.id} event={event} openEvent={openEvent} />
        ))}

        {!isSearch && (
          <div>
            <GeolocationControl options={geolocationOptions} />
            <SearchControl options={searchOptions} />
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
