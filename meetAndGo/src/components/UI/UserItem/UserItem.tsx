import { FC } from 'react';
import cl from './UserItem.module.scss';
import { IUser } from '../../../types/types';

interface UserItemProps {
  user: IUser;
}

const UserItem:FC<UserItemProps> = ({user}) => {
  return (
    <li className={cl.UserItem}>
      <img className={cl.UserItemImage} src={user.image} alt=""/>
      <div>
        <h3 className={cl.UserItemHeading}>{user.username}</h3>
        <p className={cl.UserItemPhone}>{user.phone || 'Не указан'}</p>
      </div>
    </li>
  )
}

export default UserItem