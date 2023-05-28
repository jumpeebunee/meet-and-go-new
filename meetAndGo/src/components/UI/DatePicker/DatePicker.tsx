import cl from './DatePicker.module.scss'
import { IonDatetime, IonModal } from '@ionic/react'
import MainButton from '../../UI/MainButton/MainButton'
import { getIsoDate } from '../../../helpers/getIsoDate'
import { FC } from 'react'

interface DatePickerProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  eventDate: string;
  setEventDate: (arg: string) => void;
}

const DatePicker:FC<DatePickerProps> = ({isOpen, setIsOpen, eventDate, setEventDate}) => {
  return (
    <IonModal isOpen={isOpen}>
      <div className={cl.datePicker}>
        <IonDatetime min={getIsoDate()} value={eventDate} onIonChange={(e) => setEventDate(e.detail.value as string)}/>
        <MainButton onClick={() => setIsOpen(false)}>Подтвердить</MainButton>
      </div>
    </IonModal>
  )
}

export default DatePicker