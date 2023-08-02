import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();
  const [user] = useAuthState(auth);//recebe os dados de usuário atual

  useEffect(() => {
    if(!user)navigate('/login');//caso não haja usuário, redireciona para a pag de login
  }, []);

  return (
    <div>
      <h1>Welcome {user?.displayName}!</h1>
      <span>Your is is {user?.uid}</span>
    </div>
  );
};

export default Home;
