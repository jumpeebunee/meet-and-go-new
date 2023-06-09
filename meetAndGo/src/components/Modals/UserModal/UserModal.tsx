import { IonContent, IonModal } from "@ionic/react"
import { FC } from "react"
import cl from './UserModal.module.scss'
import SecondButton from "../../UI/SecondButton/SecondButton";
import { IUser } from "../../../types/types";
import ProfileAvatar from "../../UI/ProfileAvatar/ProfileAvatar";
import ProfileAbout from "../../UI/ProfileAbout/ProfileAbout";
import ProfileItem from "../Profile/ProfileItem";
import { useSelector } from "react-redux";
import { user } from "../../../app/feautures/userSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

interface UserModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  openedUser: IUser;
  setOpenedUser: (arg: IUser) => void;
}

const UserModal:FC<UserModalProps> = ({isOpen, setIsOpen, setOpenedUser, openedUser}) => {

  const currentUser = useSelector(user);

  const handleClose = () => {
    setIsOpen(false)
    setOpenedUser({} as IUser);
  }

  const handleBan = async () => {
    const ref = doc(db, "users", openedUser.uid);
    await updateDoc(ref, {
      isBanned: true,
    });
  }

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${cl.UserModalContainer}`}>
          {(currentUser.role === 'ADMIN' && !openedUser.isBanned) && <button onClick={handleBan} className={cl.UserModalRemoveBtn}><span></span></button>}
          <div className={cl.UserModalContent}>
            <ProfileAvatar link={openedUser.isBanned ? 'https://i.yapx.ru/V7dFR.png' : openedUser.image}/>
            <ProfileAbout name={openedUser.isBanned ? 'Профиль скрыт' : openedUser.username} rep={openedUser.reputation}/>
            <ul className={cl.UserModaList}>
              <ProfileItem title='Количество встреч:' body={openedUser.totalMeets}/>
              <ProfileItem title='Организовано встреч:' body={openedUser.createdMeets}/>
              <ProfileItem title='Город:' body={openedUser.isBanned ? 'Скрыт': (openedUser.town || 'Не указан')}/>
              <ProfileItem title='Телефон:' body={openedUser.isBanned ? 'Скрыт': (openedUser.phone || 'Не указан')}/>
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