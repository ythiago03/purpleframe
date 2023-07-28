import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Navigate } from 'react-router-dom';

const Login = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        <Navigate to="/" />;
      })
      .catch(error => {
        console.error(error.message);
      });
    
  };

  return (
    <div>
      <h1>Create acount</h1>
      <input 
        type="text" 
        placeholder="Email..." 
        onChange={e => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password..." 
        onChange={e => setPassword(e.target.value)}
      />
      <input 
        type="button" 
        value="Create" 
        onClick={createUser}  
      />
    </div>
  );
};

export default Login;
