import { IonContent, IonPage, IonRouterLink } from "@ionic/react"
import AuthBanner from "../components/AuthBanner"
import LoginForm from "../components/LoginForm"
import cl from '../styles/loginPage.module.scss'

const Login = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="container auth__container">
          <div className={cl.loginPageContent}>
            <AuthBanner/>
            <LoginForm/>
            <p className={cl.loginPageToggle}>
              Первый раз?
              <IonRouterLink routerLink="/register"><span> Создать аккаунт</span></IonRouterLink>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Login