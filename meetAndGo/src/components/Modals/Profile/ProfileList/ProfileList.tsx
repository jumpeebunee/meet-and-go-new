import { FC } from "react";
import ProfileItem from "../ProfileItem/ProfileItem";
import ProfileItemEditable from "../ProfileItemEditable/ProfileItemEditable";
import cl from "./ProfileList.module.scss";

interface ProfileListProps {
  totalMeets: number;
  createdMeets: number;
  townField: string;
  phoneField: string;
  isEdit: boolean;
  setTownField: (arg: string) => void;
  setPhoneField: (arg: string) => void;
}

const ProfileList: FC<ProfileListProps> = ({
  totalMeets,
  createdMeets,
  setPhoneField,
  setTownField,
  townField,
  phoneField,
  isEdit,
}) => {
  return (
    <ul className={cl.List}>
      <ProfileItem title="Количество встреч:" body={totalMeets} />

      <ProfileItem title="Организовано встреч:" body={createdMeets} />

      <ProfileItemEditable
        handleChange={setTownField}
        title="Город:"
        current={townField}
        isEdit={isEdit}
        placeholder="Не указан"
      />

      <ProfileItemEditable
        handleChange={setPhoneField}
        title="Телефон:"
        current={phoneField}
        isEdit={isEdit}
        placeholder="Не указан"
      />
    </ul>
  );
};

export default ProfileList;
