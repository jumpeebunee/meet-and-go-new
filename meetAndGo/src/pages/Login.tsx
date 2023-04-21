import { IonContent, IonPage, IonRouterLink, NavContext } from "@ionic/react"
import AuthBanner from "../components/AuthBanner"
import LoginForm from "../components/LoginForm"
import cl from '../styles/loginPage.module.scss'
import { ILogin } from "../types/types"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { useContext, useState } from "react"
import ForgotAcc from "../components/Modals/ForgotAcc/ForgotAcc"

const Login = () => {

  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const { navigate } = useContext(NavContext);

  const handleLogin = async(data: ILogin) => {
    setServerError('');
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/home', 'forward');
    } catch (error: any) {
      setServerError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <IonPage>
      <IonContent>
        <div className="container auth__container">
          <div className={cl.loginPageContent}>
            <AuthBanner/>
            <LoginForm setIsForgot={setIsForgot} isLoading={isLoading} handleLogin={handleLogin} serverError={serverError}/>
            {!isLoading &&
              <p className={cl.loginPageToggle}>
                Первый раз?
                <IonRouterLink routerLink="/register"><span> Создать аккаунт</span></IonRouterLink>
              </p>
            }
          </div>
        </div>
        <ForgotAcc
          isOpen={isForgot}
          setIsOpen={setIsForgot}
        />
      </IonContent>
    </IonPage>
  )
}

export default Login