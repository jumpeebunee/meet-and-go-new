import { FC } from 'react';

import { IUser } from '../../../types/types';
import cl from './UserItem.module.scss';

interface UserItemProps {
  user: IUser;
  isLeader: boolean;
  handle: () => void;
}

const UserItem:FC<UserItemProps> = ({user, isLeader, handle}) => {
  return (
    <li onClick={() => handle()} className={cl.UserItem}>
      <img 
        className={`${cl.UserItemImage} ${isLeader ? cl.UserItemImageLeader : ''}`}
        src={user.isBanned ?  'https://i.yapx.ru/V7dFR.png' : user.image} 
        alt="Участник события"
      />
      <div>
        {isLeader && <div className={cl.UserItemLeader}>создатель</div>}
        <h3 className={cl.UserItemHeading}>{user.isBanned ? 'Пользователь заблокирован' : user.username}</h3>
        <p className={cl.UserItemPhone}>{user.isBanned ? 'Скрыт' : (user.phone || 'Не указан')}</p>
      </div>
    </li>
  )
}

export default UserItem