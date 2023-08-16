import { FC } from "react";
import cl from "./OpenedEvent.module.scss";
import MainButton from "../../UI/MainButton/MainButton";
import SecondButton from "../../UI/SecondButton/SecondButton";
import { useSelector } from "react-redux";
import { openedEvent } from "../../../app/feautures/openedEventSlice";
import { user } from "../../../app/feautures/userSlice";
import Button from "../../UI/Button/Button";

interface OpenedEventButtonsProps {
  activeEvent: boolean;
  isLoading: boolean;
  isEnded: boolean;
  handleLeave: () => void;
  handleEnter: () => void;
  setIsOpen: (isOpen: boolean) => void;
  totalActiveUsers: number | null;
  totalUsers: number;
}

const OpenedEvennttButtons: FC<OpenedEventButtonsProps> = ({
  activeEvent,
  isLoading,
  isEnded,
  handleLeave,
  handleEnter,
  setIsOpen,
  totalActiveUsers,
  totalUsers,
}) => {
  const { leader } = useSelector(openedEvent);
  const { uid } = useSelector(user);

  return (
    <div className={cl.openedEventBtns}>
      {activeEvent ? (
        <div>
          <Button
            fullWidth
            disabled={isLoading || isEnded}
            onClick={handleLeave}
          >
            {" "}
            {leader === uid ? "Удалить" : "Покинуть"}
          </Button>
        </div>
      ) : (
        <>
          {totalActiveUsers === totalUsers ? (
            <></>
          ) : (
            <Button
              fullWidth
              disabled={isLoading || isEnded}
              onClick={handleEnter}
            >
              Присоединиться
            </Button>
          )}
        </>
      )}
      <Button type="secondaryGrey" onClick={() => setIsOpen(false)}>
        Назад
      </Button>
    </div>
  );
};

export default OpenedEvennttButtons;
