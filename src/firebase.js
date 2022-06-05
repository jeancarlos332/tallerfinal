import firebase from "firebase";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDjMweqh5xkKur_i97rKMMz-UJhjwRY1PM",
  authDomain: "usersapp-ecf68.firebaseapp.com",
  projectId: "usersapp-ecf68",
  storageBucket: "usersapp-ecf68.appspot.com",
  messagingSenderId: "1012260800347",
  appId: "1:1012260800347:web:8e17d2582f3675f62a7c7e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export {firebase}