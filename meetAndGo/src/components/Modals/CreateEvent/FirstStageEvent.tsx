import { FC, useState } from "react"
import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import DateInput from "../../UI/DateInput/DateInput";
import EventNameInput from "../../UI/EventNameInput/EventNameInput";
import DatePicker from "../../UI/DatePicker/DatePicker";
import LabelInput from "../../UI/LabelInput/LabelInput";
import { useSelector, useDispatch } from 'react-redux';
import { changeName, changeDate, changeLocation, eventData } from "../../../app/feautures/createEventSlice";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";

interface FirstStageEventProps {}

const FirstStageEvent:FC<FirstStageEventProps> = () => {

  const [isOpenDate, setIsOpenDate] = useState(false);

  const dispatch = useDispatch();
  const fullEvent = useSelector(eventData);

  const handleChangeName = (value: string) =>  dispatch(changeName(value));
  const handleChangeLocation = (value: string) => dispatch(changeLocation(value));
  const handleChangeDate = (value: string) => dispatch(changeDate(value));

  return (
    <>
      <div className={cl.createEventList}>
        <h2 className={cl.createEventHeading}>Создать новое событие</h2>
        <EventNameInput eventName={fullEvent.name} setEventName={handleChangeName}/>
        <DateInput eventDate={fullEvent.date} setIsOpenDate={setIsOpenDate}/>
        <LabelInput
          title="Локация"
          placeholder="Локация мероприятия"
          inputValue={fullEvent.location}
          setInputValue={handleChangeLocation}
        />
        <DatePicker
          isOpen={isOpenDate}
          setIsOpen={setIsOpenDate}
          eventDate={fullEvent.date}
          setEventDate={handleChangeDate}
        />
      </div>
      {fullEvent.validError && <ErrorMessage styles={{marginTop: 10}}>{fullEvent.validError}</ErrorMessage>}
    </>
  )
}

export default FirstStageEvent