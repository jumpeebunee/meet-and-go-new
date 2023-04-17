import { FC } from "react"
import cl from './ProfileAbout.module.scss'

interface ProfileAboutProps {
  name: string;
  rep: number;
}

const ProfileAbout:FC<ProfileAboutProps> = ({name, rep}) => {
  return (
    <div className={cl.ProfileAbout}>
      <h2 className={cl.ProfileAboutHeading}>{name}</h2>
      <div className={cl.ProfileAboutRep}><p>Репутация: {rep}</p><span></span></div>
      <div className={cl.ProfileAboutBorder}></div>
    </div>
  )
}

export default ProfileAbout