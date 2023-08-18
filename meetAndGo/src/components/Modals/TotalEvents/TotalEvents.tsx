import { IonContent, IonModal, IonSpinner } from "@ionic/react";
import { doc, getDoc } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { user } from "../../../app/feautures/userSlice";
import { db } from "../../../firebase";
import type { IEvent } from "../../../types/types";
import Button from "../../UI/Button/Button";
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

  const [currentState, setCurrentState] = useState("active");
  const [events, setEvents] = useState<IEvent[]>([]);
  const [archiveEvents, setArchiveEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      getEvent();
    } else {
      setEvents([]);
    }
  }, [isOpen]);

  const getEvent = async () => {
    const result = [];

    setIsLoading(true);

    if (currentUser.activeMeets) {
      for (let i = 0; i < currentUser.activeMeets.length; i++) {
        const event = currentUser.activeMeets[i];
        const docRef = doc(db, "events", event);
        const docSnap = await getDoc(docRef);
        const currentEvent = docSnap.data() as IEvent;
        result.push(currentEvent);
      }
      setEvents(result);
    }
    setArchiveEvents(currentUser.archive);
    setIsLoading(false);
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`container ${cl.TotalEventsContainer}`}>
          <div className={cl.TotalEventsMain}>
            <TotalEventsHeader
              currentState={currentState}
              setCurrentState={setCurrentState}
            />
            {!isLoading && (
              <TotalEventsList
                events={events}
                setIsOpenEvent={setIsOpenEvent}
              />
            )}
          </div>
          {isLoading && (
            <div className={cl.TotalEventsLoading}>
              <IonSpinner name="circular"></IonSpinner>
            </div>
          )}
          <div className={cl.TotalEventsBtns}>
            <Button
              fullWidth
              type="secondaryGrey"
              onClick={() => setIsOpen(false)}
            >
              Назад
            </Button>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default TotalEvents;
