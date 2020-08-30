import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA9CqvCUEyXfgDwK0WIBtMZBzMDhCGEu6Q",
  authDomain: "backoffice-35933.firebaseapp.com",
  databaseURL: "https://backoffice-35933.firebaseio.com",
  projectId: "backoffice-35933",
  storageBucket: "backoffice-35933.appspot.com",
  messagingSenderId: "866403545931",
  appId: "1:866403545931:web:a3437a72e571f1f40aeece",
  measurementId: "G-94WX6VTNVL",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots:true})

export default firebase;
