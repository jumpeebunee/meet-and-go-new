import { IonContent, IonModal } from "@ionic/react";
import { FC, useEffect, useState } from "react";
import cl from "./OpenedEvent.module.scss";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useSelector } from "react-redux";
import { user } from "../../../app/feautures/userSlice";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import { unactiveEvents } from "../../../helpers/unactiveEvents";
import { openedEvent } from "../../../app/feautures/openedEventSlice";
import Header from "./elements/Header/Header";
import Content from "./elements/Content/Content";
import Buttons from "./elements/Buttons/Buttons";

interface OpenedEventProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  setIsUsersOpen: (arg: boolean) => void;
}

const OpenedEvent: FC<OpenedEventProps> = ({
  isOpen,
  setIsOpen,
  setIsUsersOpen,
}) => {
  const currentUser = useSelector(user);
  const event = useSelector(openedEvent);

  const [activeEvent, setActiveEvent] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const currentDate = new Date(event.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  useEffect(() => {
    if (isOpen) {
      const isActive = event.activeUsers.find(
        (user) => user.id === currentUser.uid
      );

      const isValid = checkIsValid();
      if (!isValid) {
        setIsLoading(false);
        return;
      } else {
        setIsError("");
        setIsEnded(false);
      }

      if (isActive) {
        setActiveEvent(true);
      } else {
        setActiveEvent(false);
      }
    }
  }, [isOpen]);

  const checkIsValid = () => {
    const eventDate = new Date(event.date).getTime();

    if (eventDate - Date.now() < 0) {
      unactiveEvents(event);
      setIsError("Событие завершилось.");
      setIsEnded(true);
      return false;
    }
    return true;
  };

  const handleEnter = async () => {
    const eventRef = doc(db, "events", event.id);
    const userRef = doc(db, "users", currentUser.uid);

    setIsLoading(true);
    setIsEnded(false);
    setIsError("");

    const isValid = checkIsValid();

    if (!isValid) return;

    try {
      await updateDoc(eventRef, {
        activeUsers: arrayUnion({
          id: currentUser.uid,
          image: currentUser.image,
          reputation: currentUser.reputation,
        }),
      });
      await updateDoc(userRef, {
        totalMeets: increment(1),
        activeMeets: arrayUnion(event.id),
      });
      setIsOpen(false);
    } catch (error) {
      setIsError("Что-то пошло не так :(");
    } finally {
      setIsEnded(false);
      setIsLoading(false);
    }
  };

  const handleLeave = async () => {
    const eventRef = doc(db, "events", event.id);
    const userRef = doc(db, "users", currentUser.uid);

    setIsLoading(true);
    setIsEnded(false);
    setIsError("");

    const isValid = checkIsValid();
    if (!isValid) return;

    try {
      if (event.leader === currentUser.uid) {
        for (let user of event.activeUsers) {
          const ref = doc(db, "users", user.id);
          await updateDoc(ref, {
            activeMeets: arrayRemove(event.id),
            createdMeets: currentUser.createdMeets - 1,
          });
        }
        await deleteDoc(doc(db, "events", event.id));
      } else {
        await updateDoc(eventRef, {
          activeUsers: arrayRemove({
            id: currentUser.uid,
            image: currentUser.image,
            reputation: currentUser.reputation,
          }),
        });
        await updateDoc(doc(db, "users", currentUser.uid), {
          totalMeets: currentUser.totalMeets - 1,
        });
      }
      await updateDoc(userRef, {
        activeMeets: arrayRemove(event.id),
      });
      setIsOpen(false);
    } catch (error) {
      setIsError("Что-то пошло не так :(");
    } finally {
      setIsLoading(false);
    }
  };

  const removeEvent = async () => {
    setIsLoading(true);
    setIsError("");

    try {
      for (let user of event.activeUsers) {
        const ref = doc(db, "users", user.id);
        await updateDoc(ref, { activeMeets: arrayRemove(event.id) });
      }
      await deleteDoc(doc(db, "events", event.id));
      setIsOpen(false);
    } catch (error) {
      setIsError("Что-то пошло не так :(");
    } finally {
      setIsLoading(false);
    }
  };

  const totalActiveUsers = event.activeUsers ? event.activeUsers.length : null;

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`container ${cl.Container}`}>
          {currentUser.role === "ADMIN" && (
            <button onClick={removeEvent} className={cl.RemoveButton}>
              <span></span>
            </button>
          )}

          <div>
            <Header title={event.title} date={currentDate} />

            <Content
              totalActiveUsers={totalActiveUsers}
              setIsUsersOpen={setIsUsersOpen}
            />

            {isError && (
              <ErrorMessage styles={{ marginTop: 15 }}>{isError}</ErrorMessage>
            )}
          </div>

          <Buttons
            activeEvent={activeEvent}
            isLoading={isLoading}
            isEnded={isEnded}
            handleLeave={handleLeave}
            handleEnter={handleEnter}
            setIsOpen={setIsOpen}
            totalActiveUsers={totalActiveUsers}
            totalUsers={event.totalUsers}
          />
        </div>
      </IonContent>
    </IonModal>
  );
};

export default OpenedEvent;
