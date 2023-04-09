import { FC } from 'react'
import AppModal from '../../UI/AppModal/AppModal';
import cl from './ProfileModal.module.scss'
import { useSelector } from 'react-redux';
import { user } from '../../../app/feautures/userSlice';
import ProfileModalUser from './ProfileModalUser';

interface ProfileModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const ProfileModal:FC<ProfileModalProps> = ({isOpen, setIsOpen}) => {

  const currentUser = useSelector(user);

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={cl.profileModal}>
        <ProfileModalUser 
          image={currentUser.image} 
          username={currentUser.username}
          raiting={currentUser.reputation}
        />
      </div>
    </AppModal>
  )
}

export default ProfileModal