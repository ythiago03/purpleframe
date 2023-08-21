import React, { useState } from 'react';

import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';

import {AiFillEdit} from 'react-icons/ai';
import './Profile.css';

const Profile = () => {

  const [user] = useAuthState(auth);

 
  return (
    <div className="profile">
      <Sidebar userImg={user?.photoURL} username={user?.displayName} />
      <div className="profile-wrapper">
        <div className="profile-data">
          <img src={user?.photoURL} alt="Profile Picture" />
          <h1>@{user?.displayName}</h1>
          <Link to={`/editProfile/${user?.uid.slice(0, 6)}`}>
            <AiFillEdit size={25} color="#A084E8" />
          </Link>
        </div>
        
        
      </div>
    </div>
  );
};

export default Profile;
