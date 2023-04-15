import { FC } from 'react'
import cl from './EventUsers.module.scss'

interface EventUsersProps {
  users: number;
  usersAvatars?: string[];
  style?: React.CSSProperties;
}

const usersColors = ['#1A1A1A', '#75D7A1', '#FF906D', '#67A4FF'];

const EventUsers:FC<EventUsersProps> = ({users, usersAvatars, style}) => {

  const eventUsers = [];

  for (let i = 0; i < 4; i++) {
    eventUsers.push(<li style={{background: usersColors[i % 10]}} className={cl.EventUsersAvatar}></li>)
  }

  return (
    <div style={style} className={cl.EventUsers}>
      <div className='label'>Участники</div>
      <div className={cl.EventUsersTotal}>
        {!usersAvatars
        ? 
          <ul className={cl.EventUsersList}>
            {...eventUsers}
          </ul>
        : <ul></ul>
        }
        <div>1/{users}</div>
      </div>
    </div>
  )
}

export default EventUsers