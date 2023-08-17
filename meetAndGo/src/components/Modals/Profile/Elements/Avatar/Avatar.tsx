import { FC } from "react";
import cl from "./Avatar.module.scss";
import { IonSpinner } from "@ionic/react";

interface AvatarProps {
  isLoading: boolean;
  image: string;
  handleFileChange: (arg: React.ChangeEvent<HTMLInputElement>) => void;
}

const Avatar: FC<AvatarProps> = ({ isLoading, image, handleFileChange }) => {
  return (
    <div className={isLoading ? `${cl.Loading} ${cl.Wrapper}` : cl.Wrapper}>
      <img className={cl.Avatar} src={image} alt="Ваш аватар" />

      <span className={cl.Upload}></span>

      <input
        disabled={isLoading}
        accept="image/png, image/jpeg"
        onChange={(e) => handleFileChange(e)}
        type="file"
      />

      {isLoading && (
        <div className={cl.Spinner}>
          <IonSpinner name="crescent"></IonSpinner>
        </div>
      )}
    </div>
  );
};

export default Avatar;
