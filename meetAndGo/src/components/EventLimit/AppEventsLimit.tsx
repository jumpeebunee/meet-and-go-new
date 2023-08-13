import { FC } from "react";
import SecondButton from "../UI/SecondButton/SecondButton";
import cl from "./AppEventsLimit.module.scss";
import Button from "../UI/Button/Button";

interface AppEventsLimitProps {
  title: string;
  body: string;
  setIsOpen?: (arg: boolean) => void;
}

const AppEventsLimit: FC<AppEventsLimitProps> = ({
  title,
  body,
  setIsOpen,
}) => {
  return (
    <div className={cl.Container}>
      <div>
        <h2 className="title-xl">{title}</h2>
        <p className="body-m">{body}</p>
      </div>

      {setIsOpen && (
        <div className={cl.Button}>
          <Button
            type="secondaryGrey"
            fullWidth
            onClick={() => setIsOpen(false)}
          >
            Закрыть
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppEventsLimit;
