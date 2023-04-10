import { FC } from 'react'
import cl from '../../../styles/ProfileModal/profileModal.module.scss'

interface ProfileInfoProps {
  username: string;
  raiting: number;
  setIsRaitngOpen: (arg: boolean) => void;
}

const ProfileInfo:FC<ProfileInfoProps> = ({username, raiting, setIsRaitngOpen}) => {
  return (
    <>
      <h3>{username}</h3>
      <div className={cl.profileModalRaiting}>
        <div className={cl.profileModalRaitingWrapper}>
          <div className={cl.profileModalRatingHeading}>Моя репутация: {raiting}</div>
          <span className={cl.profileModalRatingIcon}></span>
        </div>
        <button onClick={() => setIsRaitngOpen(true)} className={cl.profileModalRaitingHow}>Как повысить?</button>
        <div className={cl.profileModalRaitingLine}></div>
      </div>
    </>
  )
}

export default ProfileInfo