import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  // your config here
    apiKey: "AIzaSyDhYNR0a9RSC126a4PWtFuSCRmV6CqZHT8",
    authDomain: "ecommerce-b8206.firebaseapp.com",
    projectId: "ecommerce-b8206",
    storageBucket: "ecommerce-b8206.appspot.com",
    messagingSenderId: "25093575962",
    appId: "1:25093575962:web:489b8d2eab48d7527a08a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


