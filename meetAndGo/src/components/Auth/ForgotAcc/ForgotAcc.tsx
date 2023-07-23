import { IonContent, IonModal } from '@ionic/react';
import cl from './ForgotAcc.module.scss';
import { FC, useState } from 'react';
import SecondButton from '../../UI/SecondButton/SecondButton';
import LabelInput from '../../UI/LabelInput/LabelInput';
import MainButton from '../../UI/MainButton/MainButton';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

interface ForgotAccProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  setIsSended: (arg: boolean) => void;
}

const ForgotAcc:FC<ForgotAccProps> = ({isOpen, setIsOpen, setIsSended}) => {

  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async () => {
    const currentEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

    setIsError('');
    setIsLoading(true);

    if (!currentEmail.test(email)) {
      setIsError('Невалидная почта');
      setIsLoading(false);
      return;
    }

    const docRef = doc(db, "emails", email);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.data()) {
      setIsError('Пользователь не найден');
      setIsLoading(false);
      return;
    }

    sendPasswordResetEmail(auth, email).then(() => {
      setIsSended(true);
      setIsLoading(false);
      setIsOpen(false);
    })
    
  }

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
           {isError &&  <ErrorMessage styles={{marginTop: 15}}>{isError}</ErrorMessage>}
          </div>
          <div className={cl.ForgotAccBtns}>
            <MainButton disabled={isLoading} onClick={sendEmail}>Отправить</MainButton>
            <SecondButton disabled={isLoading} onClick={() => setIsOpen(false)}>Назад</SecondButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  )
}

export default ForgotAcc