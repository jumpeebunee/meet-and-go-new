import React, { FC } from 'react'
import AppModal from '../../UI/AppModal/AppModal'
import SecondButton from '../../UI/SecondButton/SecondButton';
import cl from '../../../styles/RaitingModal/raitingModal.module.scss';
import { IonModal } from '@ionic/react';

interface RaitingModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const RaitingModal:FC<RaitingModalProps> = ({isOpen, setIsOpen}) => {
  return (
    <IonModal isOpen={isOpen}>
      <div className={`modal-container ${cl.raitingModal}`}>
        <div>
          <h2 className='heading'>Репутация</h2>
          <div className={cl.raitingModalContent}>
            <p className='description'>Чтобы повышать свою репутацию создавайте события. Приглашайте друзей и участвуйте в мероприятиях.</p>
            <p className='description'>Чем больше репутация тем больше доверия вам окажут другие пользователи. Вы так же сможете создавать больше событий.</p>
          </div>
        </div>
        <SecondButton onClick={() => setIsOpen(false)}>Назад</SecondButton>
      </div>
    </IonModal>
    // <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
    //   <div className={`modal-container ${cl.raitingModal}`}>
    //     <div>
    //       <h2 className='heading'>Репутация</h2>
    //       <div className={cl.raitingModalContent}>
    //         <p className='description'>Чтобы повышать свою репутацию создавайте события. Приглашайте друзей и участвуйте в мероприятиях.</p>
    //         <p className='description'>Чем больше репутация тем больше доверия вам окажут другие пользователи. Вы так же сможете создавать больше событий.</p>
    //       </div>
    //     </div>
    //     <SecondButton onClick={() => setIsOpen(false)}>Назад</SecondButton>
    //   </div>
    // </AppModal>
  )
}

export default RaitingModal