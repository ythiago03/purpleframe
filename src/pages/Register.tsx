import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';//função para criar user com email e senha
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

const Register = () => {

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6).max(20),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]).required(),
  });

  const {register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const createAcount = async ({email, password}) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);//criando novo user
    console.log(result);
    navigate('/login');
  };

  const onSubmit = data => createAcount(data);
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
      <input 
        type="email" 
        placeholder="Your email..." 
        {...register('email')}
      />
      <input 
        type="password" 
        placeholder="Your password..." 
        {...register('password')}
      />
      <input 
        type="password" 
        placeholder="Confirm your password..." 
        {...register('confirmPassword')}
      />
      <input type="submit"/>
    </form>
  );
};

export default Register;
