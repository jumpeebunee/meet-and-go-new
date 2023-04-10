import { FC } from 'react'
import cl from '../../../styles/ProfileModal/profileItem.module.scss'

interface ProfileItemProps {
  title: string | number,
  body: string | number,
}

const ProfileItem:FC<ProfileItemProps> = ({title, body}) => {
  return (
    <li className={cl.profileModalItem}>
      <h3>{title}</h3>
      <p>{body}</p>
    </li>
  )
}

export default ProfileItem