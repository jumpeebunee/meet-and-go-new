import { FC } from 'react'
import cl from './EventUsers.module.scss'

interface EventUsersProps {
  users: number;
  usersAvatars?: string[];
  style?: React.CSSProperties;
}

const usersColors = ['#75D7A1', '#FF9458', '#6E8EFF', '#EB66A2', '#D3E854', '#A481E2', '#5CC7D6', '#FF6969', '#4EE4AE', '#E86DE3'];

const EventUsers:FC<EventUsersProps> = ({users, usersAvatars, style}) => {

  const eventUsers = [];

  for (let i = 0; i < users; i++) {
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