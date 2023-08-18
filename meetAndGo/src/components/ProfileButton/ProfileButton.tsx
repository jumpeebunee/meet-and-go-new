import { FC } from "react";

import cl from "./ProfileButton.module.scss";

interface ProfileButtonProps {
  image: string;
  setIsProfileOpen: (arg: boolean) => void;
}

const ProfileButton: FC<ProfileButtonProps> = ({ image, setIsProfileOpen }) => {
  return (
    <button onClick={() => setIsProfileOpen(true)} className={cl.Button}>
      <div>Профиль</div>

      <div className={cl.Image}>
        <img src={image} />
      </div>
    </button>
  );
};

export default ProfileButton;
