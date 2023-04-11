import { FC } from "react"
import EventNamesList from "./EventNamesList";
import cl from '@/styles/CreateEventModal/createEvent.module.scss';

interface FirstStageEventProps {
  eventName: string;
  setEventName: (arg: string) => void;
}

const FirstStageEvent:FC<FirstStageEventProps> = ({eventName, setEventName}) => {
  return (
    <div className={cl.createEventList}>
      <div className={cl.createEventItem}>
        <label className={`label ${cl.createEventLabel}`} htmlFor="name">Название</label>
        <input 
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="input"
          id="name"
          placeholder="Название события"
        />
        <EventNamesList setName={setEventName}/>
      </div>
    </div>

  )
}

export default FirstStageEvent