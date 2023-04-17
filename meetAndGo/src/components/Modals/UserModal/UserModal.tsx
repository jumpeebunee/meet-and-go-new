import { IonContent, IonModal } from "@ionic/react"
import { FC } from "react"
import cl from './UserModal.module.scss'
import SecondButton from "../../UI/SecondButton/SecondButton";
import ProfileImage from "../Profile/ProfileImage";
import { IUser } from "../../../types/types";
import ProfileAvatar from "../../UI/ProfileAvatar/ProfileAvatar";
import ProfileAbout from "../../UI/ProfileAbout/ProfileAbout";
import ProfileItem from "../Profile/ProfileItem";

interface UserModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  openedUser: IUser;
  setOpenedUser: (arg: IUser) => void;
}

const UserModal:FC<UserModalProps> = ({isOpen, setIsOpen, setOpenedUser, openedUser}) => {

  const handleClose = () => {
    setIsOpen(false)
    setOpenedUser({} as IUser);
  }

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${cl.UserModalContainer}`}>
          <div className={cl.UserModalContent}>
            <ProfileAvatar link={openedUser.image}/>
            <ProfileAbout name={openedUser.username} rep={openedUser.reputation}/>
            <ul className={cl.UserModaList}>
              <ProfileItem title='Количество встреч:' body={openedUser.totalMeets}/>
              <ProfileItem title='Организовано встреч:' body={openedUser.createdMeets}/>
              <ProfileItem title='Город:' body={openedUser.town || 'Не указан'}/>
              <ProfileItem title='Телефон:' body={openedUser.phone || 'Не указан'}/>
            </ul>
          </div>
          <div className={cl.UserModalBtns}>
            <SecondButton onClick={() => handleClose()}>Назад</SecondButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  )
}

export default UserModal