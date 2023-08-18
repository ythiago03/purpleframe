import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { AiFillGoogleCircle } from 'react-icons/ai';
const Sidebar = () => {
  return (
    <nav className="sidebar">
      <h1 className="logo">PurpleFrame</h1>
      
      <ul className="side-links">
        <li>
          <Link to={'/'} >
            <AiFillGoogleCircle  size={35} />
            Home
          </Link>
        </li>
        <li>
          <Link to={'/'} >
            <AiFillGoogleCircle  size={35} />
            Search
          </Link>
        </li>
        <li>
          <Link to={'/createPost'} >
            <AiFillGoogleCircle  size={35} />
            New Post
          </Link>
        </li>
        <li>
          <Link to={'/'} >
            <AiFillGoogleCircle  size={35} />
            User
          </Link>
        </li>
      </ul>
      <span>Log Out</span>
    </nav>
  );
};

export default Sidebar;
