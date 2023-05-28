import { FC } from "react";
import { useDispatch } from "react-redux";
import { IEvent } from "../../../types/types";
import { chatActions } from "../Chat/slice";
import EventItem from "../EventItem/EventItem";
import cl from "./TotalEvents.module.scss";

interface TotalEventsListProps {
  events: IEvent[];
  setIsOpenEvent: (arg: boolean) => void;
}

const TotalEventsList: FC<TotalEventsListProps> = ({
  events,
  setIsOpenEvent,
}) => {
  if (events.length > 0) {
    const dispatch = useDispatch();

    const handleChatClick = (chatId: string) => () => {
      dispatch(chatActions.set({ currentChatId: chatId, isOpen: true }));
    };

    return (
      <ul className={cl.TotalEventList}>
        {events.map((event) => (
          <EventItem
            onChatClick={handleChatClick(event.chatId)}
            setIsOpenEvent={setIsOpenEvent}
            event={event}
            key={event.id}
          />
        ))}
      </ul>
    );
  } else {
    return (
      <div className={cl.TotalEventNot}>У вас еще нет активных событий</div>
    );
  }
};

export default TotalEventsList;
