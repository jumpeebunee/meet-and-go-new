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

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <IonPage>
      <div className='container app__container'>
        <AppMap
          setIsProfileOpen={setIsProfileOpen}
          setIsCreateEventOpen={setIsCreateEventOpen}
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
      </div>
    </IonPage>
  );
};

export default Home;
