import { IonPage } from '@ionic/react';
import { YMaps, Map } from '@pbe/react-yandex-maps';
import { useHistory } from 'react-router';
import AppMap from '../components/AppMap';

const Home: React.FC = () => {

  const history = useHistory();

  const handleTest = () => {
    history.push('/login');
  }

  return (
    <IonPage>
      <div className='container app__container'>
        <AppMap/>
      </div>
    </IonPage>
  );
};

export default Home;
