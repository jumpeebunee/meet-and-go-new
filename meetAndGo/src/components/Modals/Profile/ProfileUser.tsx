import { FC, useState } from 'react'
import cl from '../../../styles/ProfileModal/profileModal.module.scss'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { updateImage } from '../../../app/feautures/userSlice';
import ProfileImage from './ProfileImage';
import ProfileInfo from './ProfileInfo';

interface ProfileUserProps {
  image: string;
  username: string;
  raiting: number;
}

const ProfileUser:FC<ProfileUserProps> = ({image, username, raiting}) => {

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
      <ProfileImage
        image={image}
        isLoading={isLoading}
        handleFileChange={handleFileChange}
      />
      <ProfileInfo
        username={username}
        raiting={raiting}
      />
    </div>
  )
}

export default ProfileUser