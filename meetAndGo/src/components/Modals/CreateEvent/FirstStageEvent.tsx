import { FC, useState } from "react"
import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import DateInput from "../../UI/DateInput/DateInput";
import EventNameInput from "../../UI/EventNameInput/EventNameInput";
import DatePicker from "../../UI/DatePicker/DatePicker";
import LabelInput from "../../UI/LabelInput/LabelInput";
import { useSelector, useDispatch } from 'react-redux';
import { changeName, changeDate, changeLocation } from "../../../app/feautures/createEventSlice";
import { name, date, location, validError } from "../../../app/feautures/createEventSlice";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";

interface FirstStageEventProps {}

const FirstStageEvent:FC<FirstStageEventProps> = () => {

  const [isOpenDate, setIsOpenDate] = useState(false);

  const dispatch = useDispatch();
  const eventName = useSelector(name);
  const eventDate = useSelector(date);
  const eventLocation = useSelector(location);
  const eventError = useSelector(validError);

  const handleChangeName = (value: string) =>  dispatch(changeName(value));
  const handleChangeLocation = (value: string) => dispatch(changeLocation(value));
  const handleChangeDate = (value: string) => dispatch(changeDate(value));

  return (
    <>
      <div className={cl.createEventList}>
        <h2 className={cl.createEventHeading}>Создать новое событие</h2>
        <EventNameInput eventName={eventName} setEventName={handleChangeName}/>
        <DateInput eventDate={eventDate} setIsOpenDate={setIsOpenDate}/>
        <LabelInput
          title="Локация"
          placeholder="Локация мероприятия"
          inputValue={eventLocation}
          setInputValue={handleChangeLocation}
        />
        <DatePicker
          isOpen={isOpenDate}
          setIsOpen={setIsOpenDate}
          eventDate={eventDate}
          setEventDate={handleChangeDate}
        />
      </div>
      {eventError && <ErrorMessage styles={{marginTop: 10}}>{eventError}</ErrorMessage>}
    </>
  )
}

export default FirstStageEvent