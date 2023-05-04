import React, { FC } from 'react'
import { IEvent } from '../../../types/types'
import EventItem from '../EventItem/EventItem';
import cl from './TotalEvents.module.scss'
import { useDispatch } from 'react-redux';
import { chatActions } from '../Chat/chatSlice';

interface TotalEventsListProps {
  events: IEvent[];
  setIsOpenEvent: (arg: boolean) => void;
}

const TotalEventsList:FC<TotalEventsListProps> = ({events, setIsOpenEvent}) => {
  if (events.length > 0) {
		const dispatch = useDispatch()

		const handleChatClick = (chatId: string) => () => {
			dispatch(chatActions.setFields({currentChatId: chatId, isOpen: true}))
		}

    return (
      <ul className={cl.TotalEventList}>
        {events.map(event => 
          <EventItem
						onChatClick={handleChatClick(event.chatId)}
            setIsOpenEvent={setIsOpenEvent}
            event={event}
            key={event.id}
          />  
        )}
      </ul>
    )
  } else {
    return (
      <div className={cl.TotalEventNot}>У вас еще нет активных событий</div>
    )
  }
}

export default TotalEventsList