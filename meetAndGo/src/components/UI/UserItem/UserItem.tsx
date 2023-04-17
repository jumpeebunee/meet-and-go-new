import { FC } from 'react';
import cl from './UserItem.module.scss';
import { IUser } from '../../../types/types';

interface UserItemProps {
  user: IUser;
  isLeader: boolean;
  handle: () => void;
}

const UserItem:FC<UserItemProps> = ({user, isLeader, handle}) => {
  return (
    <li onClick={() => handle()} className={cl.UserItem}>
      <img className={`${cl.UserItemImage} ${isLeader ? cl.UserItemImageLeader : ''}`} src={user.image} alt=""/>
      <div>
        {isLeader && <div className={cl.UserItemLeader}>создатель</div>}
        <h3 className={cl.UserItemHeading}>{user.username}</h3>
        <p className={cl.UserItemPhone}>{user.phone || 'Не указан'}</p>
      </div>
    </li>
  )
}

export default UserItem