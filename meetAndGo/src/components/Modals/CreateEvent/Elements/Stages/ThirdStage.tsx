import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { eventData } from "../../../../../app/feautures/createEventSlice";
import { changeColor } from "../../../../../app/feautures/createEventSlice";
import { getRandomColor } from "../../../../../helpers/getRandomColor";
import AppLocation from "../../../../UI/AppLocation/AppLocation";
import ErrorMessage from "../../../../UI/ErrorMessage/ErrorMessage";
import EventPrice from "../../../../UI/EventPrice/EventPrice";
import EventUsers from "../../../../UI/EventUsers/EventUsers";
import cl from "../../createEvent.module.scss";

const ThirdStageEvent = () => {
  const dispatch = useDispatch();
  const fullEvent = useSelector(eventData);

  const currentDate = new Date(fullEvent.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  useEffect(() => {
    dispatch(changeColor(getRandomColor()));
  }, []);

  return (
    <>
      <div>
        <div className={cl.HeaderThird}>
          <h2 className={`${cl.Title} title-xl`}>{fullEvent.name}</h2>
          <div className="label_description">{currentDate}</div>
        </div>

        <AppLocation
          location={fullEvent.location}
          address={fullEvent.address}
          eventCords={fullEvent.coords}
          eventColor={fullEvent.color}
        />

        <div className={cl.ContentThird}>
          <EventUsers users={fullEvent.users} />
          <EventPrice price={fullEvent.price} />
        </div>
      </div>
      {fullEvent.validError && (
        <ErrorMessage styles={{ marginTop: 15 }}>
          {fullEvent.validError}
        </ErrorMessage>
      )}
    </>
  );
};

export default ThirdStageEvent;
