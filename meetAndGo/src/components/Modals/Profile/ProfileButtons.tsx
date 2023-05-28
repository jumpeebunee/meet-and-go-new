import { FC } from 'react'
import cl from '../../../styles/ProfileModal/profileModal.module.scss'
import MainButton from '../../UI/MainButton/MainButton'
import SecondButton from '../../UI/SecondButton/SecondButton'

interface ProfileButtonsProps {
  isEdit: boolean;
  handleEdit: () => void;
}

const ProfileButtons:FC<ProfileButtonsProps> = ({isEdit, handleEdit}) => {
  return (
    <div className={cl.profileModalBtns}>
      <MainButton onClick={handleEdit}>{isEdit ? 'Сохранить' : 'Изменить'}</MainButton>
      <SecondButton>Назад</SecondButton>
    </div>
  )
}

export default ProfileButtons