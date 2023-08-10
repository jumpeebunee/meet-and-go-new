import { FC } from "react";
import cl from "./ProfileItem.module.scss";

interface ProfileItemProps {
  title: string | number;
  body: string | number;
}

const ProfileItem: FC<ProfileItemProps> = ({ title, body }) => {
  return (
    <li className={cl.profileModalItem}>
      <h3 className="body-m">{title}</h3>
      <p className="body-m">{body}</p>
    </li>
  );
};

export default ProfileItem;
