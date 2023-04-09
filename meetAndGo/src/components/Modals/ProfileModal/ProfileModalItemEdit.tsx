import { FC } from 'react'
import cl from './ProfileModalItem.module.scss'

interface ProfileModalItemEditProps {
  title: string;
  isEdit: boolean;
  current: string,
  placeholder: string;
}

const ProfileModalItemEdit:FC<ProfileModalItemEditProps> = ({title, isEdit, current, placeholder}) => {
  return (
    <li className={cl.profileModalItem}>
      <h3>{title}</h3>
      <p>{current ? current : placeholder}</p>
    </li>
  )
}

export default ProfileModalItemEdit