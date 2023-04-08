import { IonContent, IonPage } from "@ionic/react"
import AuthBanner from "../components/AuthBanner"
import LoginForm from "../components/LoginForm"

const Login = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="container auth__container">
          <AuthBanner/>
          <LoginForm/>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Login