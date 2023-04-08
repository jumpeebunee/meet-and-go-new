import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, NavContext, setupIonicReact } from '@ionic/react';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';
import './styles/normolize.css';
import './styles/app.scss'
import Login from './pages/Login';
import Register from './pages/Register';
import { FC, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { IUser } from './types/types';
import { useDispatch } from 'react-redux';
import { addUser } from './app/feautures/userSlice';
import AppNavigation from './components/AppNavigation';

/* Theme variables */
// import './theme/variables.css';

setupIonicReact();

const App:FC = () => {
  
  const dispatch = useDispatch();
  const { navigate } = useContext(NavContext);

  useEffect(() => {
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
    })
  }, [])

  const subscribeUserUpdates = (id: string) => {
    onSnapshot(doc(db, "users", id), (doc) => {
      dispatch(addUser(doc.data() as IUser));
    });
  }


  return (
    <IonApp>
      <AppNavigation/>
    </IonApp>
  )
}
export default App;
