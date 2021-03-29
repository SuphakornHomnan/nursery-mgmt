import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuRK2lE27qUWUoW5RuYB1OXv8z4vkyp-U",
  authDomain: "nursery-upload.firebaseapp.com",
  databaseURL: "https://nursery-upload.firebaseio.com",
  projectId: "nursery-upload",
  storageBucket: "nursery-upload.appspot.com",
  messagingSenderId: "639578150013",
  appId: "1:639578150013:web:87968bf5a5a49982cb0d14",
  measurementId: "G-3Q54DJDDQE",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
