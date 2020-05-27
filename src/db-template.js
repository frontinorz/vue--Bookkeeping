// Replace your firebase config, and import to store/index.js

import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
});

export const db = firebase.firestore();
export const docId = "";