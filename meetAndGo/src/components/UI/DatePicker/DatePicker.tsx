import cl from "./DatePicker.module.scss";
import { IonDatetime, IonModal } from "@ionic/react";
import MainButton from "../../UI/MainButton/MainButton";
import { getIsoDate } from "../../../helpers/getIsoDate";
import { FC } from "react";
import Button from "../Button/Button";

interface DatePickerProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  eventDate: string;
  setEventDate: (arg: string) => void;
}

const DatePicker: FC<DatePickerProps> = ({
  isOpen,
  setIsOpen,
  eventDate,
  setEventDate,
}) => {
  return (
    <IonModal isOpen={isOpen}>
      <div className={cl.Picker}>
        <div className={cl.Wrapper}>
          <IonDatetime
            min={getIsoDate()}
            value={eventDate}
            onIonChange={(e) => setEventDate(e.detail.value as string)}
          />
        </div>

        <Button onClick={() => setIsOpen(false)}>Подтвердить</Button>
      </div>
    </IonModal>
  );
};

export default DatePicker;
