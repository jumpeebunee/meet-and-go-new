import { FC } from "react";

import { getFormatedDate } from "../../../helpers/getFormatedDate";
import cl from "./DateInput.module.scss";

interface DateInputProps {
  eventDate: string;
  setIsOpenDate: (arg: boolean) => void;
}

const DateInput: FC<DateInputProps> = ({ eventDate, setIsOpenDate }) => {
  return (
    <div className={cl.dateInput}>
      <input
        disabled
        value={getFormatedDate(eventDate)}
        className="input"
        placeholder="Не выбрано"
        type="text"
      />

      <button onClick={() => setIsOpenDate(true)} className={cl.Button}>
        <span></span>
      </button>
    </div>
  );
};

export default DateInput;
