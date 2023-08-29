import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { 
  AiFillHome, 
  AiOutlinePlus, 
  AiOutlineUser } from 'react-icons/ai';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Post } from '../../interfaces/interfaces';

const Sidebar = ({userImg}: Post) => {

  const [user] = useAuthState(auth);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleResize = () => {
    const innerWidht = window.innerWidth;
    if(innerWidht <= 720){
      setSidebarHidden(true);
      return;
    }
    setSidebarHidden(false);
  };

  window.addEventListener('resize' , handleResize);

  return (
    <nav className="sidebar">
      <h1 className="logo">{!sidebarHidden && 'PurpleFrame'}</h1>
      
      <ul className="side-links">
        <li>
          <Link to={'/'} >
            <AiFillHome  size={35} />
            {!sidebarHidden && 'Home'}
          </Link>
        </li>
        {/* <li>
          <Link to={'/'} >
            <AiOutlineSearch  size={35} />
            Search
          </Link>
        </li> */}
        <li>
          <Link to={'/createPost'} >
            <AiOutlinePlus  size={35} />
            {!sidebarHidden && 'New Post'}
          </Link>
        </li>
        <li>
          <Link to={`/profile/${user?.uid.slice(0, 6)}`} >
            {userImg == null 
              ? <AiOutlineUser  size={35} /> 
              : <img className="userPic" src={userImg} alt="Profile Picture"/>}
            {!sidebarHidden && 'Profile'}
          </Link>
        </li>
      </ul>
      <button className="logout" onClick={logOut} >Log Out</button>
    </nav>
  );
};

export default Sidebar;
