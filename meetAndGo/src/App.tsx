import { IonApp, NavContext, setupIonicReact } from '@ionic/react';

import '@ionic/react/css/core.css';
import './styles/normolize.css';
import './styles/app.scss'
import { FC, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { IEvent, IUser } from './types/types';
import { useDispatch } from 'react-redux';
import { addUser } from './app/feautures/userSlice';
import { addEvents } from './app/feautures/eventsSlice';
import AppNavigation from './components/AppNavigation';
import AppLoading from './components/AppLoading';

setupIonicReact();

const App:FC = () => {
  
  const dispatch = useDispatch();
  const { navigate } = useContext(NavContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, async(user) => {
      if (user) {
        if (user.email && user.uid && user.displayName) {
          const querySnapshot = await getDocs(collection(db, "users"));
          querySnapshot.forEach((doc) => {
            if (doc.data().uid === user.uid) {
              const data = doc.data() as IUser;
              dispatch(addUser(data));
            }
          });
          subscribeUserUpdates(user.uid);
        }
        navigate('/home', 'forward');
      } else {
        navigate('/login', 'forward');
      }
      setIsLoading(false);
    })
  }, [])

  const subscribeUserUpdates = async(id: string) => {
    onSnapshot(doc(db, "users", id), (doc) => {
      dispatch(addUser(doc.data() as IUser));
    });
    onSnapshot(collection(db, "events"), doc => {
      const data: IEvent[] = []
      doc.forEach((d) => {
        const event = d.data() as IEvent;
        data.push(event);
      })
      dispatch(addEvents(data));
    })
  }

  return (
    <IonApp>
      {isLoading
        ? <AppLoading/>
        : <AppNavigation/>
      }
    </IonApp>
  )
}
export default App;
