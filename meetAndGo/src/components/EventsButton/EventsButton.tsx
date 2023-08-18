import { FC } from "react";

import cl from "./EventsButton.module.scss";

interface EventsButtonProps {
  handle: () => void;
}

const EventsButton: FC<EventsButtonProps> = ({ handle }) => {
  return (
    <button onClick={() => handle()} className={cl.Button}>
      <span></span>
    </button>
  );
};

export default EventsButton;
