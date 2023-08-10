import { FC } from "react";
import cl from "../ProfileInfo/ProfileInfo.module.scss";

interface ProfileInfoProps {
  username: string;
  raiting: number;
  setIsRaitngOpen: (arg: boolean) => void;
}

const ProfileInfo: FC<ProfileInfoProps> = ({
  username,
  raiting,
  setIsRaitngOpen,
}) => {
  return (
    <>
      <h3 className="title-xl">{username}</h3>
      <div className={cl.Raiting}>
        <div className={cl.RaitingWrapper}>
          <div className={cl.Title}>Моя репутация: {raiting}</div>
          <span className={cl.Icon}></span>
        </div>
        <button onClick={() => setIsRaitngOpen(true)} className={cl.Button}>
          Как повысить?
        </button>
        <div className={cl.Line}></div>
      </div>
    </>
  );
};

export default ProfileInfo;
