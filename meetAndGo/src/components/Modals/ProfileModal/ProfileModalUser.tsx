import { FC, useState } from 'react'
import cl from './ProfileModal.module.scss'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { updateImage } from '../../../app/feautures/userSlice';
import { IonSpinner } from '@ionic/react';

interface ProfileModalUserProps {
  image: string;
  username: string;
  raiting: number;
}

const ProfileModalUser:FC<ProfileModalUserProps> = ({image, username, raiting}) => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
 
    setIsLoading(true);
    const storageRef = ref(storage, username);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
      (snapshot) => {},
      (error) => {}, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          try {
            const userUid = auth.currentUser?.uid;
            if (userUid) {
              dispatch(updateImage(downloadURL));
              await updateProfile(auth.currentUser as any, { photoURL: downloadURL, })
              const userRef = doc(db, "users", userUid);
              await updateDoc(userRef, { image: downloadURL, });
            }
          } catch (error: any) {
          } finally {
            setIsLoading(false);
          }
        });
      }
    );
  }

  return (
    <div className={cl.profileModalUser}>
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