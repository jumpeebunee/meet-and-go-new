import { FC, useMemo, useState } from 'react'
import AppModal from '../../UI/AppModal/AppModal';
import cl from './ProfileModal.module.scss'
import { useSelector } from 'react-redux';
import { user } from '../../../app/feautures/userSlice';
import ProfileModalUser from './ProfileModalUser';
import ProfileModalItem from './ProfileModalItem';
import ProfileModalItemEdit from './ProfileModalItemEdit';
import MainButton from '../../UI/MainButton/MainButton';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';

interface ProfileModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const phoneRegExp = /^\d{11,11}$/;
const townRegExp = /^[а-яА-Я]{1,15}$/;

const ProfileModal:FC<ProfileModalProps> = ({isOpen, setIsOpen}) => {

  const currentUser = useSelector(user);

  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [townField, setTownField] = useState(currentUser.town);
  const [phoneField, setPhoneField] = useState(currentUser.phone);

  const handleEdit = () => {
    if (isEdit) {
      const isPhoneValid = phoneRegExp.test(phoneField) || phoneField.length === 0;
      const isTownValid = townRegExp.test(townField) || townField.length === 0;

      if (isPhoneValid && isTownValid) {
        setIsEdit(false);
        setIsError(false);
        updateData();
      } else {
        setIsError(true);
      }
    } else {
      setIsEdit(true);
    }
  }

  const updateData = async() => {
    const documentRef = doc(db, "users", currentUser.uid);

    await updateDoc(documentRef, {
      phone: phoneField,
      town: townField,
    });
  }

  useMemo(() => {
    if (!isOpen && isEdit) {
      setTownField(currentUser.town);
      setPhoneField(currentUser.phone);
      setIsError(false);
      setIsEdit(false);
    } 
  }, [isOpen])

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={cl.profileModal}>
        <div>
          <ProfileModalUser 
            image={currentUser.image} 
            username={currentUser.username}
            raiting={currentUser.reputation}
          />
          <ul className={cl.profileModalList}>
            <ProfileModalItem title="Количество встреч:" body={currentUser.totalMeets}/>
            <ProfileModalItem title="Организовано встреч:" body={currentUser.createdMeets}/>
            <ProfileModalItemEdit handleChange={setTownField} title="Город:" current={townField} isEdit={isEdit} placeholder='Не указан'/> 
            <ProfileModalItemEdit handleChange={setPhoneField} title="Телефон:" current={phoneField} isEdit={isEdit} placeholder='Не указан'/> 
          </ul>
          {isError && <ErrorMessage>Некорректный номер или город</ErrorMessage>}
        </div>
        <div className={cl.profileModalBtns}>
          <MainButton onClick={handleEdit}>{isEdit ? 'Сохранить' : 'Изменить'}</MainButton>
        </div>
      </div>
    </AppModal>
  )
}

export default ProfileModal