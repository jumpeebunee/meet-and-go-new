import { FC } from "react";

import ProfileItemEditable from "../EditableItem/EditableItem";
import ProfileItem from "../Item/Item";
import cl from "./List.module.scss";

interface ListProps {
  totalMeets: number;
  createdMeets: number;
  townField: string;
  phoneField: string;
  isEdit: boolean;
  setTownField: (arg: string) => void;
  setPhoneField: (arg: string) => void;
}

const List: FC<ListProps> = ({
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

export default List;
