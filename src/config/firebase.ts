import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyBSl9PXlEygjclnh2VIGa-2du79b75aZ4o',
  authDomain: 'react-firebase-4bcb7.firebaseapp.com',
  projectId: 'react-firebase-4bcb7',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
