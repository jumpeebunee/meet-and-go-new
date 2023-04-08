import { IonContent, IonPage, IonRouterLink, NavContext } from "@ionic/react"
import AuthBanner from "../components/AuthBanner"
import LoginForm from "../components/LoginForm"
import cl from '../styles/loginPage.module.scss'
import { ILogin } from "../types/types"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { useContext, useState } from "react"
import ErrorMessage from "../components/ErrorMessage/ErrorMessage"

const Login = () => {

  const [serverError, setServerError] = useState('');
  const { navigate } = useContext(NavContext);

  const handleLogin = async(data: ILogin) => {
    setServerError('');
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/home', 'forward');
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
            <LoginForm handleLogin={handleLogin} serverError={serverError}/>
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