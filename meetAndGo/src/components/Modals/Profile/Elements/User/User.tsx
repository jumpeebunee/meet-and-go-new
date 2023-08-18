import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { updateImage } from "../../../../../app/feautures/userSlice";
import { auth, db, storage } from "../../../../../firebase";
import Avatar from "../Avatar/Avatar";
import ProfileInfo from "../Info/Info";
import cl from "./User.module.scss";

interface UserProps {
  image: string;
  username: string;
  raiting: number;
  setIsRaitngOpen: (arg: boolean) => void;
}

const User: FC<UserProps> = ({ image, username, raiting, setIsRaitngOpen }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setIsLoading(true);

    const storageRef = ref(storage, username);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {
        console.log("Uploading Image");
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            const userUid = auth.currentUser?.uid;

            if (userUid) {
              dispatch(updateImage(downloadURL));

              await updateProfile(auth.currentUser as any, {
                photoURL: downloadURL,
              });

              const userRef = doc(db, "users", userUid);
              await updateDoc(userRef, { image: downloadURL });
            }
          } catch (error) {
            if (error instanceof Error) {
              console.log(error.message);
            }
          } finally {
            setIsLoading(false);
          }
        });
      }
    );
  };

  return (
    <div className={cl.Content}>
      <Avatar
        image={image}
        isLoading={isLoading}
        handleFileChange={handleFileChange}
      />

      <ProfileInfo
        username={username}
        raiting={raiting}
        setIsRaitngOpen={setIsRaitngOpen}
      />
    </div>
  );
};

export default User;
