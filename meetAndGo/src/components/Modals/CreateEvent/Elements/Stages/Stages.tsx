import cl from "./styles/Stages.module.scss";
import { useSelector } from "react-redux";
import { eventData } from "../../../../../app/feautures/createEventSlice";
import FirstStageEvent from "./FirstStage";
import SecondStageEvent from "./SecondStage";
import ThirdStageEvent from "./ThirdStage";

const MAX_STAGES = 3;

const CreateEventStages = () => {
  const fullEvent = useSelector(eventData);

  return (
    <div>
      <div className={cl.Stages}>
        <span>{fullEvent.stage}</span>/{MAX_STAGES}
      </div>
      {fullEvent.stage === 1 && <FirstStageEvent />}
      {fullEvent.stage === 2 && <SecondStageEvent />}
      {fullEvent.stage === 3 && <ThirdStageEvent />}
    </div>
  );
};

export default CreateEventStages;
