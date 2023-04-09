import { FC } from 'react'
import cl from './ProfileModalItem.module.scss'

interface ProfileModalItemProps {
  title: string | number,
  body: string | number,
}

const ProfileModalItem:FC<ProfileModalItemProps> = ({title, body}) => {
  return (
    <li className={cl.profileModalItem}>
      <h3>{title}</h3>
      <p>{body}</p>
    </li>
  )
}

export default ProfileModalItem