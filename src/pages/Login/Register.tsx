import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';//função para criar user com email e senha
import { auth } from '../../config/firebase';

import { Link, useNavigate } from 'react-router-dom';

import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import './Register.css';
import { FormData } from '../../interfaces/interfaces';

const Register = () => {

  // validando formulário
  const schema = yup.object().shape({
    email: yup.string().email().required('Your email is required'),
    password: yup.string().required().min(6).max(20),
    confirmPassword: yup.string().oneOf([yup.ref('password')]).required(),
  });

  const {register, handleSubmit} = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  //criando usuário
  const createAcount = async ({email, password}: FormData) => {
    await createUserWithEmailAndPassword(auth, email, password);//criando novo user
    const { user } = await signInWithEmailAndPassword(auth, email, password);//logando com email e senha
    navigate(`/editProfile/${user?.uid.slice(0, 6)}`);
  };

  const onSubmit = (data: FormData) => createAcount(data);
 
  return (
    <section className="reg-login">
      <div className="reg-login-left">
        <h1>Welcome to Our Social Network!</h1>
        <p>Enter your personal details and start journey with us.</p>
      </div>

      <div className="reg-login-right">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign up</h1>
          <label>
            <span className="icon">
              <HiOutlineMail size={25} color="#A084E8" />
            </span>
            <input 
              className="reg-input"
              type="email" 
              placeholder="Email" 
              {...register('email')}
            />
            {/* <span>{errors.email?.message}</span> */}
          </label>
          <label>
            <span className="icon">
              <RiLockPasswordLine size={25} color="#A084E8" />
            </span>
            <input 
              className="reg-input"
              type="password" 
              placeholder="Password" 
              {...register('password')}
            />
          </label>
          <label>
            <span className="icon">
              <RiLockPasswordLine size={25} color="#A084E8" />
            </span>
            <input 
              className="reg-input"
              type="password" 
              placeholder="Confirm Password" 
              {...register('confirmPassword')}
            />
          </label>
          
          <input className="login-btn" type="submit" value="Sign Up"/>
          <div className="no-acount">
            <Link to={'/login'} className="link">Back to Login Page.</Link>
          </div>
        </form>
      </div>    
    </section>
  );
};

export default Register;
