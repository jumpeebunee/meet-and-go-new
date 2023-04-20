import { FC } from 'react'
import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import AppLocation from '../../UI/AppLocation/AppLocation';
import EventUsers from '../../UI/EventUsers/EventUsers';
import EventPrice from '../../UI/EventPrice/EventPrice';
import { eventData} from '../../../app/feautures/createEventSlice';
import { useSelector } from 'react-redux';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';

interface ThirdStageProps {}

const ThirdStageEvent:FC<ThirdStageProps> = () => {

  const fullEvent = useSelector(eventData);

  const currentDate = new Date(fullEvent.date).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'});

  return (
    <>
      <div>
        <div className={cl.createEventThirdHeader}>
          <h2 className={cl.createEventHeading}>{fullEvent.name}</h2>
          <div className='label_description'>{currentDate}</div>
        </div>
        <AppLocation 
          location={fullEvent.location}
          address={fullEvent.address}
          eventCords={fullEvent.coords}
          eventColor={fullEvent.color}
        />
        <div className={cl.createEventThirdContent}>
          <EventUsers users={fullEvent.users}/>
          <EventPrice price={fullEvent.price}/>
        </div> 
      </div>
      {fullEvent.validError && <ErrorMessage styles={{marginTop: 15}}>{fullEvent.validError}</ErrorMessage>}
    </>
  )
}

export default ThirdStageEvent