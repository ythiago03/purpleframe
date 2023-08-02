import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';//função para criar user com email e senha
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const createAcount = async () => {
    const result = await createUserWithEmailAndPassword(auth, email, password);//criando novo user
    console.log(result);
    navigate('/login');
  };

  return (
    <div>
      <h1>Register</h1>
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
      <button onClick={createAcount}>Create acount</button>
    </div>
  );
};

export default Register;
