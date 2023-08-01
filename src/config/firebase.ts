import { initializeApp } from 'firebase/app';//modulo para iniciar o app
import { 
  GoogleAuthProvider,//provedor de autenticação do google
  getAuth,// função para autenticar
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBSl9PXlEygjclnh2VIGa-2du79b75aZ4o',
  authDomain: 'react-firebase-4bcb7.firebaseapp.com',
  projectId: 'react-firebase-4bcb7',
};

const app = initializeApp(firebaseConfig);//iniciando o app
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
