import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { IonReactRouter } from '@ionic/react-router';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <IonReactRouter>
      <App/>
    </IonReactRouter>
  </Provider>
);