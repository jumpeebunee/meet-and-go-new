import { FC, useState } from "react";
import cl from "./createEvent.module.scss";
import { IonContent, IonModal } from "@ionic/react";
import { nanoid } from "@reduxjs/toolkit";
import { user } from "../../../app/feautures/userSlice";
import {
  arrayUnion,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useSelector, useDispatch } from "react-redux";
import {
  changeError,
  clearState,
  eventData,
} from "../../../app/feautures/createEventSlice";
import { changeStage } from "../../../app/feautures/createEventSlice";
import CreateEventBtns from "./Elements/EventButtons/EventButtons";
import CreateEventStages from "./Elements/Stages/Stages";
import AppEventsLimit from "../../EventLimit/AppEventsLimit";
import { errorOptions } from "../../../data/errorsOptions";
import {
  validateAddress,
  validateDate,
  validateLocation,
  validateName,
} from "./helpers/validation";

interface CreateEventProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const CreateEvent: FC<CreateEventProps> = ({ isOpen, setIsOpen }) => {
  const fullEvent = useSelector(eventData);
  const currentUser = useSelector(user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    dispatch(clearState());
    setIsOpen(false);
  };

  const handleCreate = async () => {
    if (isLoading) return;

    setIsLoading(true);

    dispatch(changeError(""));

    const validDate = new Date(fullEvent.date).getTime() > Date.now();

    if (!validDate) {
      dispatch(changeError("Неверная дата события"));
      setIsLoading(false);
      return;
    }

    try {
      const eventId = nanoid();

      const userEvent = {
        id: eventId,
        placemark: fullEvent.color,
        leader: currentUser.uid,
        title: fullEvent.name,
        location: fullEvent.location,
        address: fullEvent.address,
        date: fullEvent.date,
        totalUsers: fullEvent.users,
        contribution: fullEvent.price,
        coords: fullEvent.coords,
        activeUsers: [
          {
            id: currentUser.uid,
            image: currentUser.image,
            reputation: currentUser.reputation,
          },
        ],
      };

      await setDoc(doc(db, "events", eventId), userEvent);

      await updateDoc(doc(db, "users", currentUser.uid), {
        createdMeets: increment(1),
        activeMeets: arrayUnion(eventId),
      });

      handleClose();
    } catch (error) {
      dispatch(changeError("Ошибка при создании события"));
    } finally {
      setIsLoading(false);
    }
  };

  const changeEventStage = () => {
    if (isLoading) return;
    dispatch(changeStage(fullEvent.stage - 1));
  };

  const checkValidity = () => {
    dispatch(changeError(""));

    const stage = fullEvent.stage;

    if (stage === 1) {
      try {
        validateName(fullEvent.name.trim());
        validateLocation(fullEvent.location.trim());
        validateDate(new Date(fullEvent.date));

        dispatch(changeStage(stage + 1));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(changeError(error.message));
        } else {
          dispatch(changeError("Неизвестная ошибка"));
        }
      }
    } else if (stage === 2) {
      try {
        validateAddress(fullEvent.address.trim());

        dispatch(changeStage(stage + 1));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(changeError(error.message));
        } else {
          dispatch(changeError("Неизвестная ошибка"));
        }
      }
    }
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`${cl.Container} ${cl.Content}`}>
          {currentUser.activeMeets?.length >= 3 ? (
            <AppEventsLimit
              title={errorOptions.limitTitle}
              body={errorOptions.limitBody}
              setIsOpen={setIsOpen}
            />
          ) : (
            <>
              <CreateEventStages />

              <CreateEventBtns
                isLoading={isLoading}
                changeEventStage={changeEventStage}
                checkValid={checkValidity}
                handleClose={handleClose}
                createEvent={handleCreate}
              />
            </>
          )}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default CreateEvent;
