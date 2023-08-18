import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  changeDate,
  changeLocation,
  changeName,
  eventData,
} from "../../../../../app/feautures/createEventSlice";
import DateInput from "../../../../UI/DateInput/DateInput";
import DatePicker from "../../../../UI/DatePicker/DatePicker";
import ErrorMessage from "../../../../UI/ErrorMessage/ErrorMessage";
import LabelInput from "../../../../UI/LabelInput/LabelInput";
import cl from "../../createEvent.module.scss";
import EventNameInput from "../EventNameInput/EventNameInput";

const FirstStageEvent = () => {
  const [isOpenDate, setIsOpenDate] = useState(false);

  const dispatch = useDispatch();
  const fullEvent = useSelector(eventData);

  const handleChangeName = (value: string) => dispatch(changeName(value));
  const handleChangeLocation = (value: string) =>
    dispatch(changeLocation(value));
  const handleChangeDate = (value: string) => dispatch(changeDate(value));

  return (
    <>
      <div className={cl.Wrapper}>
        <h2 className={`title-xl ${cl.Title}`}>Создать новое событие</h2>

        <EventNameInput
          eventName={fullEvent.name}
          setEventName={handleChangeName}
        />

        <DateInput eventDate={fullEvent.date} setIsOpenDate={setIsOpenDate} />

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
      {fullEvent.validError && (
        <ErrorMessage styles={{ marginTop: 10 }}>
          {fullEvent.validError}
        </ErrorMessage>
      )}
    </>
  );
};

export default FirstStageEvent;
