import { IonPage } from "@ionic/react"
import AuthBanner from "../components/AuthBanner"

const Login = () => {
  return (
    <IonPage>
      <div className="container">
        <AuthBanner/>
      </div>
    </IonPage>
  )
}

export default Login