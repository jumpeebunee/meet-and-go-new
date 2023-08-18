import { IonContent, IonPage, IonRouterLink, NavContext } from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";

import AuthBanner from "../components/Auth/AuthBanner/AuthBanner";
import ForgotAcc from "../components/Auth/ForgotAcc/ForgotAcc";
import LoginForm from "../components/Auth/LoginForm/LoginForm";
import { auth } from "../firebase";
import type { ILogin } from "../types/types";
import cl from "./styles/loginPage.module.scss";
const Login = () => {
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [isSended, setIsSended] = useState(false);

  const { navigate } = useContext(NavContext);

  const handleLogin = async (data: ILogin) => {
    setServerError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/home", "forward");
    } catch (error: any) {
      setServerError(error.message);
    }

    setIsLoading(false);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="container auth__container">
          <div className={cl.loginPageContent}>
            <AuthBanner />

            <LoginForm
              isSended={isSended}
              setIsForgot={setIsForgot}
              isLoading={isLoading}
              handleLogin={handleLogin}
              serverError={serverError}
              setServerError={setServerError}
            />

            {!isLoading && (
              <p className={`body-m ${cl.Toggle}`}>
                Первый раз?
                <IonRouterLink routerLink="/register">
                  <span> Создать аккаунт</span>
                </IonRouterLink>
              </p>
            )}
          </div>
        </div>

        <ForgotAcc
          isOpen={isForgot}
          setIsOpen={setIsForgot}
          setIsSended={setIsSended}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
