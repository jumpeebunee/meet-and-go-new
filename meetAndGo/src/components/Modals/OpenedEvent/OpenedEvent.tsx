import { IonContent, IonModal } from "@ionic/react";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  query,
  runTransaction,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openedEvent } from "../../../app/feautures/openedEventSlice";
import { user } from "../../../app/feautures/userSlice";
import { db } from "../../../firebase";
import { unactiveEvents } from "../../../helpers/unactiveEvents";
import ChatButton from "../../UI/ChatButton/ChatButton";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import LinkButton from "../../UI/LinkButton/LinkButton";
import { chatActions } from "../Chat/chatSlice";
import cl from "./OpenedEvent.module.scss";
import OpenedEventButtons from "./OpenedEventButtons";
import OpenedEventContent from "./OpenedEventContent";
import OpenedEventHeader from "./OpenedEventHeader";

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
  const dispatch = useDispatch();
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
    const chatRef = doc(db, "chats", event.chatId);

    setIsLoading(true);
    setIsEnded(false);
    setIsError("");

    const isValid = checkIsValid();

    if (!isValid) return;

    try {
      const batch = writeBatch(db);
      batch.update(eventRef, {
        activeUsers: arrayUnion({
          id: currentUser.uid,
          image: currentUser.image,
          reputation: currentUser.reputation,
        }),
      });
      batch.update(userRef, {
        totalMeets: increment(1),
        activeMeets: arrayUnion(event.id),
      });
      batch.update(chatRef, { userIds: arrayUnion(currentUser.uid) });
      await batch.commit();
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
			const batch = writeBatch(db)
      if (event.leader === currentUser.uid) {
				event.activeUsers.forEach((el) =>
          batch.update(doc(db, "users", el.id), {
            activeMeets: arrayRemove(event.id),
            createdMeets: currentUser.createdMeets - 1,
          })
        );
				batch.delete(doc(db, "events", event.id));

				const q = query(
					collection(db,"messages"),
					where("chatId", "==", event.chatId)
				);
				const messages = await getDocs(q);
				messages.forEach((el) => batch.delete(doc(db, 'messages', el.id)))
				batch.delete(doc(db, "chats", event.chatId))
      } else {
				batch.update(eventRef, {
          activeUsers: arrayRemove({
            id: currentUser.uid,
            image: currentUser.image,
            reputation: currentUser.reputation,
          }),
        });
				batch.update(doc(db, "users", currentUser.uid), {
          totalMeets: currentUser.totalMeets - 1,
        });
      }
			batch.update(userRef, {
        activeMeets: arrayRemove(event.id),
      });
			await batch.commit()
      setIsOpen(false);
    } catch (error) {
			console.log('error', error)
      setIsError("Что-то пошло не так :(");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChat = () => {
    dispatch(
      chatActions.setFields({ currentChatId: event.chatId, isOpen: true })
    );
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
        <div className={`modal-container ${cl.openedEventContainer}`}>
          {currentUser.role === "ADMIN" && (
            <button onClick={removeEvent} className={cl.openedEventRemove}>
              <span></span>
            </button>
          )}
          <div>
            <OpenedEventHeader title={event.title} date={currentDate} />
            <OpenedEventContent
              totalActiveUsers={totalActiveUsers}
              setIsUsersOpen={setIsUsersOpen}
            />
            <div className={cl.openedEventLinks}>
              <ChatButton handle={() => handleOpenChat()} />
              <LinkButton link={event.id ? event.id.slice(0, 6) : ""} />
            </div>
            {isError && (
              <ErrorMessage styles={{ marginTop: 15 }}>{isError}</ErrorMessage>
            )}
          </div>
          <OpenedEventButtons
            activeEvent={activeEvent}
            isLoading={isLoading}
            isEnded={isEnded}
            handleLeave={handleLeave}
            handleEnter={handleEnter}
            handleOpenChat={handleOpenChat}
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
