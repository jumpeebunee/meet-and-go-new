import { FC } from 'react'
import cl from './UsersCounter.module.scss'

interface UsersCounterProps {
  eventUsers: number;
  setEventUsers: (arg: number) => void;
}

const UsersCounter:FC<UsersCounterProps> = ({eventUsers, setEventUsers}) => {

  const increment = () => {
    setEventUsers(eventUsers - 1);
  }

  const decrement = () => {
    setEventUsers(eventUsers + 1);
  }

  return (
    <div className={cl.UsersCounter}>
      <label className='label'>Участники</label>
      <span className='label_description'>Количество участников</span>
      <div className={cl.UsersCounterInput}>
        <button disabled={eventUsers === 2} onClick={() => increment()}>-</button>
        <span>{eventUsers}</span>
        <button disabled={eventUsers === 20} onClick={() => decrement()}>+</button>
      </div>
    </div>
  )
}

export default UsersCounter