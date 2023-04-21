import { IonContent, IonModal } from '@ionic/react';
import cl from './ForgotAcc.module.scss';
import { FC, useState } from 'react';
import SecondButton from '../../UI/SecondButton/SecondButton';
import LabelInput from '../../UI/LabelInput/LabelInput';

interface ForgotAccProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const ForgotAcc:FC<ForgotAccProps> = ({isOpen, setIsOpen}) => {

  const [email, setEmail] = useState('');

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${cl.ForgotAccContainer}`}>
          <div>
            <div className={cl.ForgotAccContent}>
              <h2>Забыли пароль?</h2>
              <div className={cl.ForgotAccContentBody}>
                <p>Введите адрес электронной почты, который вы использовали при регистрации, и мы вышлем вам инструкции по сбросу вашего пароля.</p>
                <p>По соображениям безопасности мы не храним ваш пароль. Поэтому будьте уверены, что мы никогда не отправим ваш пароль по электронной почте.</p>
              </div>
            </div>
            <LabelInput 
              title='Почта'
              placeholder='Электронная почта'
              inputValue={email}
              setInputValue={setEmail}
            />
          </div>
          <div className={cl.ForgotAccBtns}>
            <SecondButton onClick={() => setIsOpen(false)}>Назад</SecondButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  )
}

export default ForgotAcc