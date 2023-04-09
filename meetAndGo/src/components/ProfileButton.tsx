import cl from '../styles/profileButton.module.scss'
import avatar from '../assets/avatar.png'
import { FC } from 'react'

interface ProfileButtonProps {
  setIsProfileOpen: (arg: boolean) => void;
}

const ProfileButton:FC<ProfileButtonProps> = ({setIsProfileOpen}) => {
  return (
    <button onClick={() => setIsProfileOpen(true)} className={cl.profileBtn}>
      <div>Профиль</div>
      <div className={cl.profileBtnImage}>
        <img src={avatar} alt="Ваш аватар"/>
      </div>
    </button>
  )
}

export default ProfileButton