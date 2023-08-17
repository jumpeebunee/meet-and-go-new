import { FC } from "react";
import cl from "./Info.module.scss";

interface InfoProps {
  username: string;
  raiting: number;
  setIsRaitngOpen: (arg: boolean) => void;
}

const Info: FC<InfoProps> = ({ username, raiting, setIsRaitngOpen }) => {
  return (
    <>
      <h3 className="title-xl">{username}</h3>

      <div className={cl.Content}>
        <div className={cl.Wrapper}>
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

export default Info;
