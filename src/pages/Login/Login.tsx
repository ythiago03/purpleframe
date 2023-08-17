import React, { useState } from 'react';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';//método para logar com um popup e logar com email e senha
import { auth, provider } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';//função para trocar de página web
import { Link } from 'react-router-dom'; 

import { AiFillGoogleCircle } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import './Login.css';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginWithGoogle = async (e) => {
    e.preventDefault();
    const { user } = await signInWithPopup(auth, provider);//logando com popup
    console.log(user);
    navigate('/');//trocando para a home
  };

  const loginWithEmailAndPassword = async () => {
    e.preventDefault();
    const { user } = await signInWithEmailAndPassword(auth, email, password);//logando com email e senha
    console.log(user);
    navigate('/');
  };

  return (
    <section className="login">
      <div className="login-left">
        <h1>Hello, Friend!</h1>
        <p>Enter your personal details and start journey with us</p>
      </div>

      <div className="login-right">
        <h1>Login</h1>
        <form>
          <label>
            <span className="icon">
              <HiOutlineMail size={25} color="#A084E8" />
            </span>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              onChange={e => setEmail(e.target.value)}
            />
          </label>

          <label>
            <span className="icon">
              <RiLockPasswordLine  size={25} color="#A084E8" />
            </span>
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <button className="login-btn" onClick={loginWithEmailAndPassword}>Login</button>
          <button className="login-google" onClick={loginWithGoogle} >
            <AiFillGoogleCircle  size={35} color="#A084E8" />
          </button>

          <div className="no-acount">
            <span>Don&apos;t have a acount?</span>
            <Link to={'/register'} className="link">Create acount</Link>
          </div>
          
        </form>
      </div>
    </section>
  );
};

export default Login;
