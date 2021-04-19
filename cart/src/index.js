import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app'
import 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyAQZCXwQpvKOL-orlycnnr5DXEGjQRnYZE",
  authDomain: "cart-698c0.firebaseapp.com",
  projectId: "cart-698c0",
  storageBucket: "cart-698c0.appspot.com",
  messagingSenderId: "531021038422",
  appId: "1:531021038422:web:9d4747636b5958dd5eccf7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


