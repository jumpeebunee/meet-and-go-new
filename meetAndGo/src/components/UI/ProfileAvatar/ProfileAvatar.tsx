import { FC } from 'react'
import cl from './ProfileAvatar.module.scss'

interface ProfileAvatarProps {
  link: string;
}

const ProfileAvatar:FC<ProfileAvatarProps> = ({link}) => {
  return (
    <img src={link} alt='Аватар' className={cl.ProfileAvatar}/>
  )
}

export default ProfileAvatar