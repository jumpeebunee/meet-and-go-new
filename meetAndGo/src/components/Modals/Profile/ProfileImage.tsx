import { FC } from 'react'
import cl from '../../../styles/ProfileModal/profileModal.module.scss'
import { IonSpinner } from '@ionic/react';

interface ProfileImageProps {
  isLoading: boolean;
  image: string;
  handleFileChange: (arg: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImage:FC<ProfileImageProps> = ({isLoading, image, handleFileChange}) => {
  return (
    <div className={isLoading ? `${cl.profileModalImageWrapperLoading} ${cl.profileModalImageWrapper}` : cl.profileModalImageWrapper }>
      <img className={cl.profileModalImage} src={image} alt="Ваш аватар"/>
      <span className={cl.profileModalImageUpload}></span>
      <input disabled={isLoading} accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e)} type="file"/>
      {isLoading && 
        <div className={cl.profileModalImageLoading}>
          <IonSpinner name="crescent"></IonSpinner>
        </div>
      }
    </div>
  )
}

export default ProfileImage