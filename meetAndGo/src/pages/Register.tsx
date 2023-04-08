import { IonContent, IonPage, IonRouterLink } from '@ionic/react'
import AuthBanner from '../components/AuthBanner'
import cl from '../styles/loginPage.module.scss'
import RegisterForm from '../components/RegisterForm'

const Register = () => {

  return (
    <IonPage>
      <IonContent>
        <div className="container auth__container">
          <div className={cl.loginPageContent}>
            <AuthBanner/>
            <RegisterForm/>
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