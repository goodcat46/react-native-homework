// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCIfp7uV_JRXcLadgHlYKnGhN_zKnal8Sw",
//   authDomain: "rn-social-58923.firebaseapp.com",
//   projectId: "rn-social-58923",
//   storageBucket: "rn-social-58923.appspot.com",
//   messagingSenderId: "866615434732",
//   appId: "1:866615434732:web:7f7abcd66861f2db3574c9",
//   measurementId: "G-83MSL9WXDX",
// };

const firebaseConfig = {
  apiKey: 'AIzaSyAjEoVyohiTfAKpW-5AdvVdik1Uy656iJk',
  authDomain: 'react-native-homework-1.firebaseapp.com',
  projectId: 'react-native-homework-1',
  storageBucket: 'react-native-homework-1.appspot.com',
  messagingSenderId: '304210435678',
  appId: '1:304210435678:web:1e1cfad321443f40101ecf',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export const firestoreDB = getFirestore(firebaseApp);

// rules_version = '2';
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//      allow read, write: if request.auth != null;
//     }
//   }
// }
