import { IonPage } from '@ionic/react';
import { useHistory } from 'react-router';

const Home: React.FC = () => {

  const history = useHistory();

  const handleTest = () => {
    history.push('/login');
  }

  return (
    <IonPage>
      <div>qq</div>
      <button onClick={handleTest}>test</button>
    </IonPage>
  );
};

export default Home;
