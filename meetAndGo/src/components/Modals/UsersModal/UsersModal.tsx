import { IonContent, IonModal } from '@ionic/react'
import { FC, useEffect, useState } from 'react'
import SecondButton from '../../UI/SecondButton/SecondButton';
import cl from './UsersModal.module.scss'
import { IActive, IUser } from '../../../types/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import UserItem from '../../UI/UserItem/UserItem';

interface UsersModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  eventUsers: IActive[];
  eventTitle: string;
}

const UsersModal:FC<UsersModalProps> = ({isOpen, setIsOpen, eventUsers, eventTitle}) => {

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (isOpen) {
      getUsers();
    }
  }, [isOpen])

  const getUsers = async() => {
    const result:IUser[] = [];

    for (let i = 0; i < eventUsers.length; i++) {
      let user = eventUsers[i];
      const docRef = doc(db, "users", user.id);
      const docSnap = await getDoc(docRef);
      result.push(docSnap.data() as IUser);
    }

    setUsers(result);
  }

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${cl.UsersModalContainer}`}>
          <div className={cl.UsersModalHeader}>
            <h2>Участники</h2>
            <p>{eventTitle}</p>
            <ul className={cl.UsersModalList}>
              {users.map(user =>
                <UserItem user={user}/>
              )}
            </ul>
          </div>
          <div>
            <SecondButton onClick={() => setIsOpen(false)}>Назад</SecondButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  )
}

export default UsersModal