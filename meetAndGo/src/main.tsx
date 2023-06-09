import { IonReactRouter } from "@ionic/react-router";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <IonReactRouter>
      <App />
    </IonReactRouter>
  </Provider>
);
