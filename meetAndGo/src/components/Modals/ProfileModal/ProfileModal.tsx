import { FC, useState } from 'react'
import AppModal from '../../UI/AppModal/AppModal';
import cl from './ProfileModal.module.scss'
import { useSelector } from 'react-redux';
import { user } from '../../../app/feautures/userSlice';
import ProfileModalUser from './ProfileModalUser';
import ProfileModalItem from './ProfileModalItem';
import ProfileModalItemEdit from './ProfileModalItemEdit';

interface ProfileModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const ProfileModal:FC<ProfileModalProps> = ({isOpen, setIsOpen}) => {

  const currentUser = useSelector(user);

  const [isEdit, setIsEdit] = useState(false);

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={cl.profileModal}>
        <ProfileModalUser 
          image={currentUser.image} 
          username={currentUser.username}
          raiting={currentUser.reputation}
        />
        <ul className={cl.profileModalList}>
          <ProfileModalItem title="Количество встреч:" body={currentUser.totalMeets}/>
          <ProfileModalItem title="Организовано встреч:" body={currentUser.createdMeets}/>
          <ProfileModalItemEdit title="Город:" current={currentUser.town} isEdit={isEdit} placeholder='Твой город'/> 
          <ProfileModalItemEdit title="Телефон:" current={currentUser.phone} isEdit={isEdit} placeholder='Твой Телефон'/> 
        </ul>
      </div>
    </AppModal>
  )
}

export default ProfileModal