import { IonContent, IonPage, IonRouterLink, NavContext } from "@ionic/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";

import { addEvents } from "../app/feautures/eventsSlice";
import { addUser } from "../app/feautures/userSlice";
import AuthBanner from "../components/Auth/AuthBanner/AuthBanner";
import RegisterForm from "../components/Auth/RegisterForm/RegisterForm";
import { baseUserContent } from "../data/baseUserContent";
import { auth, db } from "../firebase";
import { unactiveEvents } from "../helpers/unactiveEvents";
import { IEvent, IRegister, IUser } from "../types/types";
import cl from "./styles/loginPage.module.scss";

const Register = () => {
  const dispatch = useDispatch();

  const { navigate } = useContext(NavContext);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data: IRegister) => {
    setServerError("");
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(response.user, { displayName: data.fullname });
      const userContent = {
        ...baseUserContent,
        uid: response.user.uid,
        username: data.fullname,
        email: data.email,
      };
      await setDoc(doc(db, "users", response.user.uid), userContent);
      await setDoc(doc(db, "emails", data.email), { email: data.email });

      subscribeUserUpdates(response.user.uid);
      dispatch(addUser(userContent));
      navigate("/home", "forward");
    } catch (error: any) {
      setServerError(error.message);
    }
    setIsLoading(false);
  };

  const subscribeUserUpdates = (id: string) => {
    onSnapshot(doc(db, "users", id), (doc) => {
      dispatch(addUser(doc.data() as IUser));
    });
    onSnapshot(collection(db, "events"), (doc) => {
      const data: IEvent[] = [];
      doc.forEach((d) => {
        const event = d.data() as IEvent;
        const eventDate = new Date(event.date).getTime();
        if (eventDate - Date.now() < 0) {
          unactiveEvents(event);
        } else {
          data.push(event);
        }
      });
      dispatch(addEvents(data));
    });
  };

  return (
    <IonPage>
      <IonContent>
        <div className="container auth__container">
          <div className={cl.loginPageContent}>
            <AuthBanner />
            <RegisterForm
              isLoading={isLoading}
              handleRegister={handleRegister}
              serverError={serverError}
            />
            {!isLoading && (
              <p className={`body-m ${cl.Toggle}`}>
                Уже есть профиль?
                <IonRouterLink routerDirection="back" routerLink="/login">
                  <span> Войти</span>
                </IonRouterLink>
              </p>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
