import { FC } from "react";
import { useSelector } from "react-redux";

import { openedEvent } from "../../../../../app/feautures/openedEventSlice";
import AppLocation from "../../../../UI/AppLocation/AppLocation";
import EventPrice from "../../../../UI/EventPrice/EventPrice";
import EventUsers from "../../../../UI/EventUsers/EventUsers";
import cl from "./Content.module.scss";

interface OpenedEventContentProps {
  setIsUsersOpen: (arg: boolean) => void;
  totalActiveUsers: number | null;
}

const OpenedEventContent: FC<OpenedEventContentProps> = ({
  setIsUsersOpen,
  totalActiveUsers,
}) => {
  const event = useSelector(openedEvent);

  return (
    <div className={cl.Content}>
      <AppLocation
        location={event.location}
        address={event.address}
        eventCords={event.coords}
        eventColor={event.placemark}
      />

      <div className={cl.Inputs}>
        <EventUsers
          handle={() => setIsUsersOpen(true)}
          usersAvatars={event.activeUsers}
          currentUsers={totalActiveUsers}
          users={event.totalUsers}
        />

        <EventPrice price={event.contribution} />
      </div>
    </div>
  );
};

export default OpenedEventContent;
