import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD9ZKP77NW-GVwhvl0ZsEBnzDletZt15F8",
    authDomain: "mina-5f4b8.firebaseapp.com",
    projectId: "mina-5f4b8",
    storageBucket: "mina-5f4b8.appspot.com",
    messagingSenderId: "143634310712",
    appId: "1:143634310712:web:4e833a19e60906eb8a68cd",
    measurementId: "G-7FWFM4KPMT",
    databaseURL: "https://mina-5f4b8-default-rtdb.firebaseio.com/",
  };
  
  const app = initializeApp(firebaseConfig);
  export const db = getDatabase(app)