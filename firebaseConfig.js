import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCxYIMz4P7ziY27gYuVkUmyUivOSsvkhg8",
  authDomain: "cookbookie-c5b8d.firebaseapp.com",
  projectId: "cookbookie-c5b8d",
  storageBucket: "cookbookie-c5b8d.appspot.com",
  messagingSenderId: "885684402345",
  appId: "1:885684402345:web:7a357495eb56146fff51b8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };