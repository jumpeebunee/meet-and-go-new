import { FC } from 'react'
import cl from '../../../styles/ProfileModal/profileModal.module.scss'

interface ProfileInfoProps {
  username: string;
  raiting: number;
}

const ProfileInfo:FC<ProfileInfoProps> = ({username, raiting}) => {
  return (
    <>
      <h3>{username}</h3>
      <div className={cl.profileModalRaiting}>
        <div className={cl.profileModalRaitingWrapper}>
          <div className={cl.profileModalRatingHeading}>Моя репутация: {raiting}</div>
          <span className={cl.profileModalRatingIcon}></span>
        </div>
        <div className={cl.profileModalRaitingHow}>Как повысить?</div>
        <div className={cl.profileModalRaitingLine}></div>
      </div>
    </>
  )
}

export default ProfileInfo