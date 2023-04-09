import { FC } from 'react'
import cl from './ProfileModal.module.scss'

interface ProfileModalUserProps {
  image: string;
  username: string;
  raiting: number;
}

const ProfileModalUser:FC<ProfileModalUserProps> = ({image, username, raiting}) => {
  return (
    <div className={cl.profileModalUser}>
      <img className={cl.profileModalImage} src={image} alt="Ваш аватар"/>
      <h3>{username}</h3>
      <div className={cl.profileModalRaiting}>
        <div className={cl.profileModalRaitingWrapper}>
          <div className={cl.profileModalRatingHeading}>Моя репутация: {raiting}</div>
          <span className={cl.profileModalRatingIcon}></span>
        </div>
        <div className={cl.profileModalRaitingHow}>Как повысить?</div>
        <div className={cl.profileModalRaitingLine}></div>
      </div>
    </div>
  )
}

export default ProfileModalUser