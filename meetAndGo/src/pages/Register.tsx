import { IonContent, IonPage, IonRouterLink, NavContext } from '@ionic/react'
import AuthBanner from '../components/AuthBanner'
import cl from '../styles/loginPage.module.scss'
import RegisterForm from '../components/RegisterForm'
import { IEvent, IRegister, IUser } from '../types/types'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, onSnapshot, collection } from "firebase/firestore"; 
import { auth, db } from '../firebase'
import { useContext, useState } from 'react'
import { baseUserContent } from '../data/baseUserContent'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../app/feautures/userSlice'
import { addEvents } from '../app/feautures/eventsSlice'

const Register = () => {

  const dispatch = useDispatch();

  const { navigate } = useContext(NavContext);
  const [serverError, setServerError] = useState('');

  const handleRegister = async(data: IRegister) => {
    setServerError('');
    try {
      const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(response.user, {displayName: data.fullname});
      const userContent = {
        ...baseUserContent,
        uid: response.user.uid,
        username: data.fullname,
        email: data.email,
      }
      await setDoc(doc(db, "users", response.user.uid), userContent);
      subscribeUserUpdates(response.user.uid);
      dispatch(addUser(userContent));
      navigate('/home', 'forward');
    } catch (error: any) {
      setServerError(error.message);
    }
  }

  const subscribeUserUpdates = (id: string) => {
    onSnapshot(doc(db, "users", id), (doc) => {
      dispatch(addUser(doc.data() as IUser));
    });
    onSnapshot(collection(db, "events"), doc => {
      const data: IEvent[] = []
      doc.forEach((d) => {
        data.push(d.data() as IEvent);
      })
      dispatch(addEvents(data));
    })
  }

  return (
    <IonPage>
      <IonContent>
        <div className="container auth__container">
          <div className={cl.loginPageContent}>
            <AuthBanner/>
            <RegisterForm handleRegister={handleRegister} serverError={serverError}/>
            <p className={cl.loginPageToggle}>
              Уже есть профиль?
              <IonRouterLink  routerDirection="back" routerLink="/login"><span> Войти</span></IonRouterLink>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Register