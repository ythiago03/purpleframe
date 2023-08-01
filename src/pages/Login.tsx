import React from 'react';
import { signInWithPopup } from 'firebase/auth';//método para autenticar com um popup
import { auth, provider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';//função para trocar de página web

const Login = () => {

  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);//logando com popup
    console.log(result);
    navigate('/');//trocando para a home
  };

  return (
    <div>
      <h1>Login</h1>
      
      <button onClick={loginWithGoogle} >Login With Google</button>
    </div>
  );
};

export default Login;
