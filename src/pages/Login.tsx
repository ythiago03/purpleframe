import React, { useState } from 'react';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';//método para logar com um popup e logar com email e senha
import { auth, provider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';//função para trocar de página web
import { Link } from 'react-router-dom'; 

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    const { user } = await signInWithPopup(auth, provider);//logando com popup
    console.log(user);
    navigate('/');//trocando para a home
  };

  const loginWithEmailAndPassword = async () => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);//logando com email e senha
    console.log(user);
    navigate('/');
  };

  return (
    <div>
      <h1>Login</h1>
      <input 
        type="email" 
        name="email" 
        placeholder="Your email..." 
        onChange={e => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Your password..." 
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={loginWithEmailAndPassword}>Login</button>
      <button onClick={loginWithGoogle} >Login With Google</button>
      <span>Don&apos;t have a acount?</span>
      <Link to={'/register'}>Create acount</Link>
    </div>
  );
};

export default Login;
