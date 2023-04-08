
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDuHNoHptwXQH9LICAm7qHlGoAcTa4foU",
  authDomain: "meet-and-go-new.firebaseapp.com",
  projectId: "meet-and-go-new",
  storageBucket: "meet-and-go-new.appspot.com",
  messagingSenderId: "771714448080",
  appId: "1:771714448080:web:ac18135b096bbee62c7cd5",
  measurementId: "G-HDLLHFJT47"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);