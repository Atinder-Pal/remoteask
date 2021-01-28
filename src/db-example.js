//After git clone- Rename this file to db.js
import firebase from 'firebase';

//Values of the below keys have been deleted intentionally
//Replace the below code with SDK's from your Firebase Project
let firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
  // Initialize Firebase
  const firebaseApp =  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebaseApp.firestore();