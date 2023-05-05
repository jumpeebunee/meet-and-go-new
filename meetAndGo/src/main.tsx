import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { IonReactRouter } from '@ionic/react-router';
import { ChatWSProvider } from './features/ChatWS';

const container = document.getElementById('root');
const root = createRoot(container!);


root.render(
  <Provider store={store}>
    <IonReactRouter>
      <ChatWSProvider>
        <App />
      </ChatWSProvider>
    </IonReactRouter>
  </Provider>
);