import { Placemark } from '@pbe/react-yandex-maps'
import { FC, useEffect } from 'react'
import { getMapAppMark } from '../data/yamapsApi'
import { IEvent } from '../types/types';
import { unactiveEvents } from '../helpers/unactiveEvents';

interface AppPlacemarkProps {
  openEvent: (event: IEvent) => void;
  event: IEvent;
}

const AppPlacemark:FC<AppPlacemarkProps> = ({openEvent, event}) => {

  useEffect(() => {
    unactiveEvents(event);
  },[])

  return (
    <Placemark onClick={() => openEvent(event)} options={getMapAppMark(event.placemark)} geometry={event.coords}/>
  )
}

export default AppPlacemark