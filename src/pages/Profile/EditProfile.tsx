import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Sidebar from '../../components/sidebar/Sidebar';


import {AiFillCloseCircle, AiFillCheckCircle} from 'react-icons/ai';
import './EditProfile.css';

const EditProfile = () => {
  
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const atualizaTeste = async (e) => {
    e.preventDefault();
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
    navigate(`/profile/${user?.uid.slice(0, 6)}`);
  };

  return (
    <div className="profile">
      <Sidebar userImg={user?.photoURL} username={user?.displayName} />
      <form className="profile-wrapper" onSubmit={atualizaTeste} >
        <div className="profile-data">
          <input className="profile-img" type="text" placeholder="Profile Picture" onChange={e => setPhotoURL(e.target.value)} required />
          <input className="profile-h1" type="text" placeholder={user?.displayName} onChange={e => setDisplayName(e.target.value)} required />
          
          <button onClick={() => navigate(`/profile/${user?.uid.slice(0, 6)}`)}>
            <AiFillCloseCircle size={25} color="#A084E8" />
          </button>
          <button type="submit">
            <AiFillCheckCircle size={25} color="#A084E8" />
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default EditProfile;
