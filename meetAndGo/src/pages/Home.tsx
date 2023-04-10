import { IonPage } from '@ionic/react';
import AppMap from '../components/AppMap';
import { useState } from 'react';
import ProfileModal from '../components/Modals/Profile/ProfileModal';

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
      </div>
    </IonPage>
  );
};

export default Home;
