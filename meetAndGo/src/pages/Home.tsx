import { IonPage } from '@ionic/react';
import AppMap from '../components/AppMap';
import { useState } from 'react';
import ProfileModal from '../components/Modals/Profile/ProfileModal';
import RaitingModal from '../components/Modals/Raiting/RaitingModal';
import CreateEvent from '../components/Modals/CreateEvent/CreateEvent';
import { IEvent, IUser } from '../types/types';
import OpenedEvent from '../components/Modals/OpenedEvent/OpenedEvent';
import TotalEvents from '../components/Modals/TotalEvents/TotalEvents';
import UsersModal from '../components/Modals/UsersModal/UsersModal';
import UserModal from '../components/Modals/UserModal/UserModal';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const Home: React.FC = () => {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRaitingOpen, setIsRaitngOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isOpenEvent, setIsOpenEvent] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [openedUser, setOpenedUser] = useState<IUser>({} as IUser);

  function test() {
    sendPasswordResetEmail(auth, 'jumpeebunee@gmail.com').then(() => console.log('sended'))
  }

  return (
    <IonPage>
      <div className='container app__container'>
        {/* <button onClick={test}>test</button> */}
        <AppMap
          setIsProfileOpen={setIsProfileOpen}
          setIsOpenEvent={setIsOpenEvent}
          setIsCreateEventOpen={setIsCreateEventOpen}
          setIsEventsOpen={setIsEventsOpen}
        />
        <ProfileModal
          isOpen={isProfileOpen} 
          setIsOpen={setIsProfileOpen}
          setIsRaitngOpen={setIsRaitngOpen}
        />
        <RaitingModal
          isOpen={isRaitingOpen} 
          setIsOpen={setIsRaitngOpen}
        />
        <CreateEvent
          isOpen={isCreateEventOpen} 
          setIsOpen={setIsCreateEventOpen}
        />
        <UsersModal
          isOpen={isUsersOpen} 
          setIsOpen={setIsUsersOpen}
          setIsUserOpen={setIsUserOpen}
          setOpenedUser={setOpenedUser}
        />
        <UserModal
          isOpen={isUserOpen}
          setIsOpen={setIsUserOpen}
          openedUser={openedUser}
          setOpenedUser={setOpenedUser}
        />
        <OpenedEvent
          isOpen={isOpenEvent}
          setIsOpen={setIsOpenEvent}
          setIsUsersOpen={setIsUsersOpen}
        />
        <TotalEvents
          isOpen={isEventsOpen}
          setIsOpen={setIsEventsOpen}
          setIsOpenEvent={setIsOpenEvent}
        />
      </div>
    </IonPage>
  );
};

export default Home;
