import { firebase } from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCIOz80RBNHZlwMitI_kAEIrGOlN8SHk8o",
    authDomain: "challenge-f1374.firebaseapp.com",
    projectId: "challenge-f1374",
    storageBucket: "challenge-f1374.appspot.com",
    messagingSenderId: "668982751161",
    appId: "1:668982751161:web:953b910625d6c2d2b19068",
    measurementId: "G-B0DQPYXSMV"
  };

 //require("firebase/firestore");

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};