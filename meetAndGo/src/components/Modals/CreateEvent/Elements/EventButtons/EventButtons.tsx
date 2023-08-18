import { FC } from "react";
import { useSelector } from "react-redux";

import { eventData } from "../../../../../app/feautures/createEventSlice";
import Button from "../../../../UI/Button/Button";
import cl from "./EventButtons.module.scss";

interface CreateEventBtns {
  checkValid: () => void;
  handleClose: () => void;
  changeEventStage: () => void;
  createEvent: () => void;
  isLoading: boolean;
}

const CreateEventBtns: FC<CreateEventBtns> = ({
  isLoading,
  checkValid,
  handleClose,
  changeEventStage,
  createEvent,
}) => {
  const fullEvent = useSelector(eventData);

  return (
    <div className={cl.Content}>
      {fullEvent.stage === 3 ? (
        <Button disabled={isLoading} onClick={createEvent}>
          Создать
        </Button>
      ) : (
        <Button disabled={isLoading} onClick={checkValid}>
          Продолжить
        </Button>
      )}
      {fullEvent.stage > 1 ? (
        <Button
          type="secondaryGrey"
          disabled={isLoading}
          onClick={changeEventStage}
        >
          Назад
        </Button>
      ) : (
        <Button type="secondaryGrey" disabled={isLoading} onClick={handleClose}>
          Отменить
        </Button>
      )}
    </div>
  );
};

export default CreateEventBtns;
