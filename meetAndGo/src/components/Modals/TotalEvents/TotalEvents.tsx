import { IonContent, IonModal, IonSpinner } from "@ionic/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeOpened } from "../../../app/feautures/openedEventSlice";
import { user } from "../../../app/feautures/userSlice";
import { db } from "../../../firebase";
import { IEvent } from "../../../types/types";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import FindEvent from "../../UI/FindEvent/FindEvent";
import MainButton from "../../UI/MainButton/MainButton";
import SecondButton from "../../UI/SecondButton/SecondButton";
import cl from "./TotalEvents.module.scss";
import TotalEventsHeader from "./TotalEventsHeader";
import TotalEventsList from "./TotalEventsList";

interface TotalEventsProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  setIsOpenEvent: (arg: boolean) => void;
}

const TotalEvents: FC<TotalEventsProps> = ({
  isOpen,
  setIsOpen,
  setIsOpenEvent,
}) => {
  const currentUser = useSelector(user);
  const dispatch = useDispatch();

  const [currentState, setCurrentState] = useState("active");
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFind, setIsFind] = useState(false);
  const [findValue, setFindValue] = useState("");
  const [isError, setIsError] = useState("");
  const [isFindLoading, setIsFindLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getEvents();
    } else {
      setEvents([]);
    }
  }, [isOpen]);

  const getEvents = async () => {
    setIsLoading(true);
    try {
      const { activeMeets } = currentUser;
      if (activeMeets.length) {
        const q = query(
          collection(db, "events"),
          where("id", "in", activeMeets)
        );
        const eventRes = await getDocs(q);
        setEvents(eventRes.docs.map((el) => el.data()) as IEvent[]);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeState = () => {
    setIsFind((prev) => !prev);
  };

  const findEvent = async () => {
    setIsError("");
    setIsFindLoading(true);
    try {
      const docRef = doc(db, "events", findValue);
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        setIsOpenEvent(true);
        dispatch(changeOpened(docSnap.data() as IEvent));
      } else {
        throw new Error("Событие не найдено");
      }
    } catch (error: any) {
      setIsError(error.message);
    } finally {
      setIsFindLoading(false);
    }
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${cl.TotalEventsContainer}`}>
          <div className={cl.TotalEventsMain}>
            <TotalEventsHeader
              currentState={currentState}
              setCurrentState={setCurrentState}
            />
            {isFind ? (
              <div className={cl.TotalEventsFindEvent}>
                <FindEvent
                  value={findValue}
                  setValue={setFindValue}
                  findEvent={findEvent}
                  isLoading={isFindLoading}
                />
                {isError && (
                  <ErrorMessage styles={{ marginTop: 10 }}>
                    {isError}
                  </ErrorMessage>
                )}
              </div>
            ) : (
              <>
                {" "}
                {!isLoading && (
                  <TotalEventsList
                    events={events}
                    setIsOpenEvent={setIsOpenEvent}
                  />
                )}
              </>
            )}
          </div>
          {isLoading && (
            <div className={cl.TotalEventsLoading}>
              <IonSpinner name="circular"></IonSpinner>
            </div>
          )}
          <div className={cl.TotalEventsBtns}>
            <MainButton onClick={changeState}>
              {isFind ? "Список событий" : "Найти по коду"}
            </MainButton>
            <SecondButton onClick={() => setIsOpen(false)}>Назад</SecondButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default TotalEvents;
