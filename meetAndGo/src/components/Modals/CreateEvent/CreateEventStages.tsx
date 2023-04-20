import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import { useSelector } from 'react-redux';
import { eventData } from '../../../app/feautures/createEventSlice';
import FirstStageEvent from './FirstStageEvent';
import SecondStageEvent from './SecondStageEvent';
import ThirdStageEvent from './ThirdStageEvent';

const MAX_STAGES = 3;

const CreateEventStages = () => {

  const fullEvent = useSelector(eventData);

  return (
    <div>
      <div className={cl.createEventStages}><span>{fullEvent.stage}</span>/{MAX_STAGES}</div>
      {fullEvent.stage === 1 && <FirstStageEvent/>}
      {fullEvent.stage === 2 && <SecondStageEvent/>}
      {fullEvent.stage === 3 && <ThirdStageEvent/>}
    </div>
  )
}

export default CreateEventStages