import { FC } from 'react'
import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import AppLocation from '../../UI/AppLocation/AppLocation';
import EventUsers from '../../UI/EventUsers/EventUsers';
import EventPrice from '../../UI/EventPrice/EventPrice';
import { name, date, location, address, coords, color, users, price, validError } from '../../../app/feautures/createEventSlice';
import { useSelector } from 'react-redux';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';

interface ThirdStageProps {}

const ThirdStageEvent:FC<ThirdStageProps> = () => {

  const eventName = useSelector(name);
  const eventDate = useSelector(date);
  const eventLocation = useSelector(location);
  const eventAddress = useSelector(address);
  const eventCoords = useSelector(coords);
  const eventColor = useSelector(color);
  const eventUsers = useSelector(users);
  const eventPrice = useSelector(price);
  const eventError = useSelector(validError);

  const currentDate = new Date(eventDate).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'});

  return (
    <>
      <div>
        <div className={cl.createEventThirdHeader}>
          <h2 className={cl.createEventHeading}>{eventName}</h2>
          <div className='label_description'>{currentDate}</div>
        </div>
        <AppLocation 
          location={eventLocation}
          address={eventAddress}
          eventCords={eventCoords}
          eventColor={eventColor}
        />
        <div className={cl.createEventThirdContent}>
          <EventUsers users={eventUsers}/>
          <EventPrice price={eventPrice}/>
        </div> 
      </div>
      {eventError && <ErrorMessage>{eventError}</ErrorMessage>}
    </>
  )
}

export default ThirdStageEvent