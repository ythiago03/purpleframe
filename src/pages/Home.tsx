import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if(!user)navigate('/login');
  }, []);

  return (
    <div>
      Home
    </div>
  );
};

export default Home;
