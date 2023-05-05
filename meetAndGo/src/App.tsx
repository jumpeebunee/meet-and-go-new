import { IonApp, NavContext, setupIonicReact } from "@ionic/react";
import "@ionic/react/css/core.css";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { FC, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvents } from "./app/feautures/eventsSlice";
import { addUser, user } from "./app/feautures/userSlice";
import AppEventsLimit from "./components/AppEventsLimit";
import AppLoading from "./components/AppLoading";
import AppNavigation from "./components/AppNavigation";
import { errorOptions } from "./data/errorsOptions";
import { ChatWSContext } from "./features/ChatWS";
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
  const ChatWS = useContext(ChatWSContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.email && user.uid && user.displayName) {
          // ChatWS.init({
          //   url: "ws://localhost:7171",
          //   userId: user.uid,
          // });
          const userRes = await getDoc(doc(db, 'users', user.uid))
					dispatch(addUser(userRes.data() as IUser));
          // const querySnapshot = await getDocs(collection(db, "users"));
          // querySnapshot.forEach((doc) => {
          //   if (doc.data().uid === user.uid) {
          //     const data = doc.data() as IUser;
          //     dispatch(addUser(data));
          //   }
          // });
          subscribeUserUpdates(user.uid);
          // await ChatWS.connection;
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
