import { FC } from "react";
import cl from "./ProfileItemEditable.module.scss";

interface ProfileItemEditableProps {
  title: string;
  isEdit: boolean;
  current: string;
  placeholder: string;
  handleChange: (arg: string) => void;
}

const ProfileItemEditable: FC<ProfileItemEditableProps> = ({
  title,
  isEdit,
  current,
  placeholder,
  handleChange,
}) => {
  return (
    <li className={cl.Item}>
      <h3 className="body-m">{title}</h3>

      {isEdit ? (
        <input
          maxLength={15}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={title.slice(0, title.length - 1)}
          value={current}
          autoFocus
        />
      ) : (
        <p className="body-m">{current ? current : placeholder}</p>
      )}
    </li>
  );
};

export default ProfileItemEditable;
