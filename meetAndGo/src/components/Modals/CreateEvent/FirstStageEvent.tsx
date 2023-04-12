import { FC, useState } from "react"
import EventNamesList from "./EventNamesList";
import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import { IonDatetime, IonModal } from "@ionic/react";
import MainButton from "../../UI/MainButton/MainButton";
import { getIsoDate } from "../../../helpers/getIsoDate";
import { format } from "date-fns";

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
      <div className={cl.createEventDateInput}>
        <input disabled value={format(new Date(eventDate), 'dd/MM/yyyy. Время: k:m')} className="input" placeholder="Не выбрано" type="text"/>
        <button className={cl.createEventDateBtn} onClick={() => setIsOpenDate(true)}>Изменить</button>
      </div>
      <IonModal isOpen={isOpenDate}>
        <div className={cl.createEventDate}>
          <IonDatetime min={getIsoDate()} value={eventDate} onIonChange={(e) => setEventDate(e.detail.value as string)}/>
          <MainButton onClick={() => setIsOpenDate(false)}>Подтвердить</MainButton>
        </div>
      </IonModal>
    </div>

  )
}

export default FirstStageEvent