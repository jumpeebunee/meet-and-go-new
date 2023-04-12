import { FC, useState } from "react"
import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import DateInput from "../../UI/DateInput/DateInput";
import EventNameInput from "../../UI/EventNameInput/EventNameInput";
import DatePicker from "../../UI/DatePicker/DatePicker";
import LabelInput from "../../UI/LabelInput/LabelInput";

interface FirstStageEventProps {
  eventName: string;
  eventDate: string;
  eventLocation: string;
  setEventName: (arg: string) => void;
  setEventDate: (arg: string) => void;
  setEventLocation: (arg: string) => void;
}

const FirstStageEvent:FC<FirstStageEventProps> = ({eventName, eventDate, eventLocation, setEventName, setEventDate, setEventLocation}) => {

  const [isOpenDate, setIsOpenDate] = useState(false);

  return (
    <div className={cl.createEventList}>
      <EventNameInput eventName={eventName} setEventName={setEventName}/>
      <DateInput eventDate={eventDate} setIsOpenDate={setIsOpenDate}/>
      <LabelInput
        title="Локация"
        placeholder="Локация мероприятия"
        inputValue={eventLocation}
        setInputValue={setEventLocation}
      />
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