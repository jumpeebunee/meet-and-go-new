import { FC } from 'react'
import cl from './ProfileModalItem.module.scss'

interface ProfileModalItemEditProps {
  title: string;
  isEdit: boolean;
  current: string,
  placeholder: string;
  handleChange: (arg: string) => void;
}

const ProfileModalItemEdit:FC<ProfileModalItemEditProps> = ({title, isEdit, current, placeholder, handleChange}) => {
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

export default ProfileModalItemEdit