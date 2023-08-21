import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { 
  AiFillHome, 
  AiOutlineSearch, 
  AiOutlinePlus, 
  AiOutlineUser } from 'react-icons/ai';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';


const Sidebar = ({userImg, username}) => {

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav className="sidebar">
      <h1 className="logo">PurpleFrame</h1>
      
      <ul className="side-links">
        <li>
          <Link to={'/'} >
            <AiFillHome  size={35} />
            Home
          </Link>
        </li>
        <li>
          <Link to={'/'} >
            <AiOutlineSearch  size={35} />
            Search
          </Link>
        </li>
        <li>
          <Link to={'/createPost'} >
            <AiOutlinePlus  size={35} />
            New Post
          </Link>
        </li>
        <li>
          <Link to={`/profile/${user?.uid.slice(0, 6)}`} >
            {userImg == null 
              ? <AiOutlineUser  size={35} /> 
              : <img className="userPic" src={userImg} alt="Profile Picture"/>}
            Profile    
          </Link>
        </li>
      </ul>
      <button className="logout" onClick={logOut} >Log Out</button>
    </nav>
  );
};

export default Sidebar;
