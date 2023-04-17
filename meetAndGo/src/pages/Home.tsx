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

const Home: React.FC = () => {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRaitingOpen, setIsRaitngOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isOpenEvent, setIsOpenEvent] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [eventCords, setEventCords] = useState([]);
  const [openedEvent, setOpenedEvent] = useState<IEvent>({} as IEvent);
  const [openedUser, setOpenedUser] = useState<IUser>({} as IUser);

  return (
    <IonPage>
      <div className='container app__container'>
        <AppMap
          setIsProfileOpen={setIsProfileOpen}
          setIsOpenEvent={setIsOpenEvent}
          setOpenedEvent={setOpenedEvent}
          setIsCreateEventOpen={setIsCreateEventOpen}
          setEventCords={setEventCords}
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
          eventCords={eventCords}
          setIsOpen={setIsCreateEventOpen}
        />
        <UsersModal
          isOpen={isUsersOpen} 
          setIsOpen={setIsUsersOpen}
          setIsUserOpen={setIsUserOpen}
          eventUsers={openedEvent.activeUsers}
          eventTitle={openedEvent.title}
          eventLeader={openedEvent.leader}
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
          event={openedEvent}
          setIsUsersOpen={setIsUsersOpen}
        />
        <TotalEvents
          isOpen={isEventsOpen}
          setIsOpen={setIsEventsOpen}
          setIsOpenEvent={setIsOpenEvent}
          setOpenedEvent={setOpenedEvent}
        />
      </div>
    </IonPage>
  );
};

export default Home;
