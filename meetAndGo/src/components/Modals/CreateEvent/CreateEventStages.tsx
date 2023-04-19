import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { stage } from '../../../app/feautures/createEventSlice';
import { changeStage } from '../../../app/feautures/createEventSlice';
import FirstStageEvent from './FirstStageEvent';
import SecondStageEvent from './SecondStageEvent';
import ThirdStageEvent from './ThirdStageEvent';

const MAX_STAGES = 3;

const CreateEventStages = () => {

  const createStage = useSelector(stage);

  return (
    <div>
      <div className={cl.createEventStages}><span>{createStage}</span>/{MAX_STAGES}</div>
      {createStage === 1 && <FirstStageEvent/>}
      {createStage === 2 && <SecondStageEvent/>}
      {createStage === 3 && <ThirdStageEvent/>}
    </div>
  )
}

export default CreateEventStages