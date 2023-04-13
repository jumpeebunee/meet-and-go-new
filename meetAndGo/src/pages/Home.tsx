import { IonModal, IonPage } from '@ionic/react';
import AppMap from '../components/AppMap';
import { useEffect, useMemo, useState } from 'react';
import ProfileModal from '../components/Modals/Profile/ProfileModal';
import RaitingModal from '../components/Modals/Raiting/RaitingModal';
import CreateEvent from '../components/Modals/CreateEvent/CreateEvent';

const Home: React.FC = () => {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRaitingOpen, setIsRaitngOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [eventCords, setEventCords] = useState([]);
  
  return (
    <IonPage>
      <div className='container app__container'>
        <AppMap
          setIsProfileOpen={setIsProfileOpen}
          setIsCreateEventOpen={setIsCreateEventOpen}
          setEventCords={setEventCords}
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
      </div>
    </IonPage>
  );
};

export default Home;
