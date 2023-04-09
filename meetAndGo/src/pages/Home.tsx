import { IonModal, IonPage } from '@ionic/react';
import AppMap from '../components/AppMap';
import AppModal from '../components/UI/AppModal/AppModal';
import { useState } from 'react';
import ProfileModal from '../components/Modals/ProfileModal/ProfileModal';

const Home: React.FC = () => {

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <IonPage>
      <div className='container app__container'>
        <AppMap
          setIsProfileOpen={setIsProfileOpen}
        />
        <ProfileModal
          isOpen={isProfileOpen} 
          setIsOpen={setIsProfileOpen}
        />
        {/* <AppModal 
          isOpen={isProfileOpen} 
          setIsOpen={setIsProfileOpen}
        /> */}
      </div>
    </IonPage>
  );
};

export default Home;
