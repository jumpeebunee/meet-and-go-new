import { IonContent, IonModal } from '@ionic/react'
import cl from './TotalEvents.module.scss'
import { FC } from 'react'
import SecondButton from '../../UI/SecondButton/SecondButton';

interface TotalEventsProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const TotalEvents:FC<TotalEventsProps> = ({isOpen, setIsOpen}) => {
  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${cl.TotalEventsContainer}`}>
          <div></div>
          <div>
            <SecondButton onClick={() => setIsOpen(false)}>Назад</SecondButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  )
}

export default TotalEvents