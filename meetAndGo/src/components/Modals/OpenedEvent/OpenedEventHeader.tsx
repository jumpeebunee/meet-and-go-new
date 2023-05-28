import { FC } from 'react'
import cl from './OpenedEvent.module.scss'

interface OpenedEventHeaderProps {
  title: string;
  date: string;
}

const OpenedEventHeader:FC<OpenedEventHeaderProps> = ({title, date}) => {
  return (
    <div className={cl.openedEventHeader}>
      <h2 className={cl.openedEventHeading}>{title}</h2>
      <div className='label_description'>{date}</div>
    </div>
  )
}

export default OpenedEventHeader