import { IonPage } from '@ionic/react';
import AppMap from '../components/AppMap';
import AppModal from '../components/AppModal/AppModal';
import { useState } from 'react';

const Home: React.FC = () => {

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <IonPage>
      <div className='container app__container'>
        <AppMap
          setIsProfileOpen={setIsProfileOpen}
        />
        <AppModal isOpen={isProfileOpen} setIsOpen={setIsProfileOpen}/>
      </div>
    </IonPage>
  );
};

export default Home;
