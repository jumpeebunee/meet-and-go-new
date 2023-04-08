import { IonContent, IonPage, IonRouterLink, NavContext } from '@ionic/react'
import AuthBanner from '../components/AuthBanner'
import cl from '../styles/loginPage.module.scss'
import RegisterForm from '../components/RegisterForm'
import { IRegister } from '../types/types'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'
import { useContext, useState } from 'react'

const Register = () => {

  const { navigate } = useContext(NavContext);
  const [serverError, setServerError] = useState('');

  const handleRegister = async(data: IRegister) => {
    setServerError('');
    try {
      const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(response.user, {displayName: data.fullname});
      navigate('/home', 'back');
    } catch (error: any) {
      setServerError(error.message);
    }
  }

  return (
    <IonPage>
      <IonContent>
        <div className="container auth__container">
          <div className={cl.loginPageContent}>
            <AuthBanner/>
            <RegisterForm handleRegister={handleRegister}/>
            <p className={cl.loginPageToggle}>
              Уже есть профиль?
              <IonRouterLink routerLink="/login"><span> Войти</span></IonRouterLink>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Register