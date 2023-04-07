import { IonContent, IonPage } from "@ionic/react"
import AuthBanner from "../components/AuthBanner"

const Login = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="container auth__container">
          <AuthBanner/>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Login