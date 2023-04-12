import { FC, useState } from "react"
import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import DateInput from "../../UI/DateInput/DateInput";
import EventNameInput from "../../UI/EventNameInput/EventNameInput";
import DatePicker from "../../UI/DatePicker/DatePicker";

interface FirstStageEventProps {
  eventName: string;
  eventDate: string;
  setEventName: (arg: string) => void;
  setEventDate: (arg: string) => void;
}

const FirstStageEvent:FC<FirstStageEventProps> = ({eventName, eventDate, setEventName, setEventDate}) => {

  const [isOpenDate, setIsOpenDate] = useState(false);

  return (
    <div className={cl.createEventList}>
      <DateInput eventDate={eventDate} setIsOpenDate={setIsOpenDate}/>
      <EventNameInput eventName={eventName} setEventName={setEventName}/>
      <DatePicker
        isOpen={isOpenDate}
        setIsOpen={setIsOpenDate}
        eventDate={eventDate}
        setEventDate={setEventDate}
      />
    </div>

  )
}

export default FirstStageEvent