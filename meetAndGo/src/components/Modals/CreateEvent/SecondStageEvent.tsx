import cl from '@/styles/CreateEventModal/createEvent.module.scss';
import LabelInput from '../../UI/LabelInput/LabelInput';
import { FC, useEffect, useMemo } from 'react';
import axios from 'axios';
import UsersCounter from '../../UI/UsersCounter/UsersCounter';
import RangeInput from '../../UI/RangeInput/RangeInput';

interface SecondStageProps {
  eventAddress: string;
  eventUsers: number;
  eventPrice: string;
  setEventUsers: (arg: number) => void;
  setEventAddress: (arg: string) => void;
  setEventPrice: (arg: string) => void;
  eventCords: number[];
}

const BASE_GEOCODE_URL = 'https://api.geocodify.com/v2/reverse';
const BASE_GEOCODE_KEY = '9164b0a5c6f2637aa65ef1a4285ca68779bfc9e2&lat'

const SecondStageEvent:FC<SecondStageProps> = ({eventAddress, eventUsers, eventPrice, setEventPrice, setEventUsers, setEventAddress, eventCords}) => {

  useEffect(() => {
    setAddress();
    // const res = await axios.get(`${BASE_GEOCODE_URL}?api_key=${BASE_GEOCODE_KEY}&lat=${eventCords[0]}&lng=${eventCords[1]}`);
    // setEventAddress(res.data.response.features[1].properties.label);
  }, [eventCords])

  const setAddress = async() => {
    if (eventCords.length) {
      setEventAddress('Бар Punk Fuction');
    }
  }

  return (
    <div className={cl.createEventList}>
      <h2 className={cl.createEventHeading}>О новом событии</h2>
      <LabelInput
        title="Адрес"
        placeholder='Адрес события'
        inputValue={eventAddress}
        setInputValue={setEventAddress}
      />
      <UsersCounter
        eventUsers={eventUsers}
        setEventUsers={setEventUsers}
      />
      <RangeInput
        inputValue={eventPrice}
        changeInputValue={setEventPrice}
      />
    </div>
  )
}

export default SecondStageEvent