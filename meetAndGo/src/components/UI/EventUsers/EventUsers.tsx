import { FC } from 'react'
import cl from './EventUsers.module.scss'
import { IActive } from '../../../types/types';

type IAvatar = {
  id: string;
  image: string;
}

interface EventUsersProps {
  users: number;
  currentUsers?: number | null;
  usersAvatars: IActive[];
  style?: React.CSSProperties;
  handle?: () => void;
}

const usersColors = ['#1A1A1A', '#75D7A1', '#FF906D', '#67A4FF'];

const EventUsers:FC<EventUsersProps> = ({users, currentUsers, usersAvatars, style, handle}) => {

  const eventUsers = [];

  for (let i = 0; i < 4; i++) {
    eventUsers.push(<li style={{background: usersColors[i % 10]}} className={cl.EventUsersAvatar}></li>)
  }

  return (
    <div style={style} className={cl.EventUsers}>
      <div className='label'>Участники</div>
      <div onClick={handle} className={cl.EventUsersTotal}>
        {!usersAvatars
        ? 
          <ul className={cl.EventUsersList}>
            {...eventUsers}
          </ul>
        : <ul className={cl.EventUsersList}>
            {usersAvatars.map(user =>
              <li key={user.id} style={{backgroundImage: `url(${user.image})`}} className={cl.EventUsersAvatar}></li>  
            )}
          </ul>
        }
        <div className={cl.EventUsersValue}>{currentUsers || '1'}/{users}</div>
      </div>
    </div>
  )
}

export default EventUsers