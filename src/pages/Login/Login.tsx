import React, { SyntheticEvent, useEffect } from 'react';
import { signInWithPopup, signInWithEmailAndPassword, } from 'firebase/auth';//método para logar com um popup e logar com email e senha
import { auth, provider } from '../../config/firebase';

import { useNavigate } from 'react-router-dom';//função para trocar de página web
import { Link } from 'react-router-dom'; 

import { AiFillGoogleCircle } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormData } from '../../interfaces/interfaces';
import socialImg from '../../assets/socialImg.png';
import './Login.css';


const Login = () => {

  //validando dados do formulário
  const schema = yup.object().shape({
    email: yup.string().email().required('Your email is required'),
    password: yup.string().required().min(6).max(20),
  });

  const {register, handleSubmit} = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  //logando com o google
  const loginWithGoogle = async (e: SyntheticEvent) => {
    e.preventDefault();
    await signInWithPopup(auth, provider);//logando com popup
    navigate('/');//trocando para a home
  };

  //logando com email e senha
  const loginWithEmailAndPassword = async ({email, password}: FormData) => {
    
    await signInWithEmailAndPassword(auth, email, password);
    navigate('/');
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) navigate('/');
    });
  }, []);

  const onSubmit = (data: FormData) => loginWithEmailAndPassword(data); 

  return (
    <section className="login">
      <div className="login-left">
        <h1>PurpleFrame</h1>
        <p>Sign in to connect, share, and discover with friends and the world.</p>
        <img src={socialImg} alt="Social Media Image" />
      </div>

      <div className="login-right">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span className="icon">
              <HiOutlineMail size={25} color="#A084E8" />
            </span>
            <input 
              type="email" 
              placeholder="Email" 
              {...register('email')}
            />
          </label>

          <label>
            <span className="icon">
              <RiLockPasswordLine  size={25} color="#A084E8" />
            </span>
            <input 
              type="password"
              placeholder="Password" 
              {...register('password')}
            />
          </label>
          <button className="login-btn" type="submit">Login</button>
          <button className="login-google" onClick={loginWithGoogle} >
            <AiFillGoogleCircle  size={35} color="#A084E8" />
          </button>

          <div className="no-acount">
            <span>Don&apos;t have an account?</span>
            <Link to={'/register'} className="link">Sign up</Link>
          </div>
          
        </form>
      </div>
    </section>
  );
};

export default Login;
