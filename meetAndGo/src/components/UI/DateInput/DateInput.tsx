import { FC } from 'react'
import cl from './DateInput.module.scss'
import { getFormatedDate } from '../../../helpers/getFormatedDate';

interface DateInputProps {
  eventDate: string;
  setIsOpenDate: (arg: boolean) => void;
}

const DateInput:FC<DateInputProps> = ({eventDate, setIsOpenDate}) => {
  return (
    <div className={cl.dateInput}>
      <input disabled value={getFormatedDate(eventDate)} className="input" placeholder="Не выбрано" type="text"/>
      <button className={cl.dateInputBtn} onClick={() => setIsOpenDate(true)}>Изменить</button>
    </div>
  )
}

export default DateInput