import { IonApp, NavContext, setupIonicReact } from "@ionic/react";
import "@ionic/react/css/core.css";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { FC, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addEvents } from "./app/feautures/eventsSlice";
import { addUser, user } from "./app/feautures/userSlice";
import AppLoading from "./components/AppLoading/AppLoading";
import AppNavigation from "./components/AppNavigation";
import AppEventsLimit from "./components/EventLimit/AppEventsLimit";
import { baseUserContent } from "./data/baseUserContent";
import { errorOptions } from "./data/errorsOptions";
import { auth, db } from "./firebase";
import { unactiveEvents } from "./helpers/unactiveEvents";
import "./styles/app.scss";
import "./styles/normolize.css";
import { IEvent, IUser } from "./types/types";

setupIonicReact();

const App: FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(user);

  const { navigate } = useContext(NavContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.email && user.uid && user.displayName) {
          const querySnapshot = await getDoc(doc(db, "users", user.uid));

          if (!querySnapshot.data()) {
            const userContent = {
              ...baseUserContent,
              uid: user.uid,
              username: user.displayName,
              email: user.email,
            };

            await setDoc(doc(db, "users", user.uid), userContent);
            await setDoc(doc(db, "emails", user.email), { email: user.email });

            subscribeUserUpdates(user.uid);
            dispatch(addUser(userContent));
          } else {
            dispatch(addUser(querySnapshot.data() as IUser));
          }
          subscribeUserUpdates(user.uid);
        }
        navigate("/home", "forward");
      } else {
        navigate("/login", "forward");
      }
      setIsLoading(false);
    });
  }, []);

  const subscribeUserUpdates = async (id: string) => {
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

  if (currentUser.isBanned) {
    return (
      <div className={`modal-container`}>
        <AppEventsLimit
          title={errorOptions.bannedTitle}
          body={errorOptions.bannedBody}
        />
      </div>
    );
  } else {
    return <IonApp>{isLoading ? <AppLoading /> : <AppNavigation />}</IonApp>;
  }
};

export default App;
