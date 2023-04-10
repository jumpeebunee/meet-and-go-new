import cl from '../styles/profileButton.module.scss'
import { FC } from 'react'

interface ProfileButtonProps {
  image: string;
  setIsProfileOpen: (arg: boolean) => void;
}

const ProfileButton:FC<ProfileButtonProps> = ({image, setIsProfileOpen}) => {
  return (
    <button onClick={() => setIsProfileOpen(true)} className={cl.profileBtn}>
      <div>Профиль</div>
      <div className={cl.profileBtnImage}>
        <img src={image}/>
      </div>
    </button>
  )
}

export default ProfileButton