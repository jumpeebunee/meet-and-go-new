import { FC } from "react";

import TabButton from "../../UI/TabButton/TabButton";
import cl from "./TotalEvents.module.scss";

interface TotalEventsHeaderProps {
  currentState: string;
  setCurrentState: (arg: string) => void;
}

const TotalEventsHeader: FC<TotalEventsHeaderProps> = ({
  setCurrentState,
  currentState,
}) => {
  return (
    <>
      <h2 className={cl.TotalEventsHeading}>Мои события</h2>

      <div className={cl.TotalEventsContent}>
        <TabButton
          changeState={setCurrentState}
          state={currentState}
        ></TabButton>
      </div>
    </>
  );
};

export default TotalEventsHeader;
