import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1TjyuQDydlt-_MyLbGTYofaSKkR-vMEw",
  authDomain: "drop-box-fa6c1.firebaseapp.com",
  projectId: "drop-box-fa6c1",
  storageBucket: "drop-box-fa6c1.appspot.com",
  messagingSenderId: "217619145982",
  appId: "1:217619145982:web:b9861cc02894ffa19271af",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
