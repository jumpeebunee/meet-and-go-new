import { FC } from 'react'
import cl from '../../../styles/ProfileModal/profileItem.module.scss'

interface ProfileItemEditableProps {
  title: string;
  isEdit: boolean;
  current: string,
  placeholder: string;
  handleChange: (arg: string) => void;
}

const ProfileItemEditable:FC<ProfileItemEditableProps> = ({title, isEdit, current, placeholder, handleChange}) => {
  return (
    <li className={cl.profileModalItem}>
      <h3 className={cl.profileModalHeadingEdit}>{title}</h3>
      {isEdit 
      ? <input maxLength={15} onChange={(e) => handleChange(e.target.value)} placeholder={title.slice(0, title.length - 1)} value={current} autoFocus/>
      : <p>{current ? current : placeholder}</p>
      }
    </li>
  )
}

export default ProfileItemEditable