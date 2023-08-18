import { FC } from "react";

import EventsList from "../EventsList/EventsList";
import cl from "./EventNameInput.module.scss";

interface EventNameInputProps {
  eventName: string;
  setEventName: (arg: string) => void;
}

const EventNameInput: FC<EventNameInputProps> = ({
  eventName,
  setEventName,
}) => {
  return (
    <div className={cl.eventNameInput}>
      <label className={`label ${cl.eventNameInputLabel}`} htmlFor="name">
        Название
      </label>

      <input
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        className="input"
        id="name"
        placeholder="Название события"
      />

      <EventsList setName={setEventName} />
    </div>
  );
};

export default EventNameInput;
