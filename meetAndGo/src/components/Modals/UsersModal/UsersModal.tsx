import { IonContent, IonModal, IonSpinner } from '@ionic/react'
import { FC, useEffect, useState } from 'react'
import SecondButton from '../../UI/SecondButton/SecondButton';
import cl from './UsersModal.module.scss'
import { IActive, IUser } from '../../../types/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import UserItem from '../../UI/UserItem/UserItem';
import { useSelector } from 'react-redux';
import { openedEvent } from '../../../app/feautures/openedEventSlice';

interface UsersModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  setIsUserOpen: (arg: boolean) => void;
  setOpenedUser: (arg: IUser) => void;
}

const UsersModal:FC<UsersModalProps> = ({isOpen, setIsUserOpen, setOpenedUser, setIsOpen}) => {

  const event = useSelector(openedEvent);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getUsers();
    }
  }, [isOpen])

  const getUsers = async() => {
    const result:IUser[] = [];
    setIsLoading(true);

    for (let i = 0; i < event.activeUsers.length; i++) {
      let user = event.activeUsers[i];
      const docRef = doc(db, "users", user.id);
      const docSnap = await getDoc(docRef);
      if (user.id === event.leader) {
        result.unshift(docSnap.data() as IUser);
      } else {
        result.push(docSnap.data() as IUser);
      }
    }

    setIsLoading(false);
    setUsers(result);
  }

  const handleOpen = (user: IUser) => {
    setIsUserOpen(true)
    setOpenedUser(user);
  }

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${cl.UsersModalContainer}`}>
          <div className={cl.UsersModalHeader}>
            <h2>Участники</h2>
            <p>{event.title}</p>
            {!isLoading &&
              <ul className={cl.UsersModalList}>
                {users.map(user =>
                  <UserItem handle={() => handleOpen(user)} key={user.uid} isLeader={event.leader === user.uid} user={user}/>
                )}
              </ul>
            }
          </div>
          {isLoading && <IonSpinner name='circular' style={{color: '#75D7A1'}}></IonSpinner>}
          <div className={cl.UsersModalBtns}>
            <SecondButton onClick={() => setIsOpen(false)}>Назад</SecondButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  )
}

export default UsersModal