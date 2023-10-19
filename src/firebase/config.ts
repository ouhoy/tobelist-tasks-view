import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyBw96UZMfoG1f97Em9sCT9ox99O23gdsng",
  authDomain: "tobelistnet.firebaseapp.com",
  projectId: "tobelistnet",
  storageBucket: "tobelistnet.appspot.com",
  messagingSenderId: "414671556167",
  appId: "1:414671556167:web:bfcb671a0e004f2a306b62",
  measurementId: "G-Z3FKHHGSV9"
};


initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()

export {db, auth}
