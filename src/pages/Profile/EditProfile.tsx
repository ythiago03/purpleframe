import React, { useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Sidebar from '../../components/sidebar/Sidebar';
import Post from '../../components/post/Post';
import { collection, getDocs } from 'firebase/firestore';


import {AiFillCloseCircle, AiFillCheckCircle} from 'react-icons/ai';
import './EditProfile.css';

const EditProfile = () => {
  
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const postsRef = collection(db, 'posts');
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  // const bgImg = 'https://cutewallpaper.org/21/pixel-wallpaper-gif/gif-Backgrounds-Wallpaper-Cave.gif';
  // const profileStyle = {
  //   background: `url(${bgImg})`,
  //   backgroundPosition: 'center',
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  // };

  const getPosts = async () => {
    const posts =  await getDocs(postsRef);
    setPosts(posts.docs
      .map(doc => ({...doc.data(), postId: doc.id,}))
      .filter(post => (post.userId == user?.uid)));
  };

  useEffect(() => {
    getPosts();
  }, [posts]);

  const atualizaTeste = async (e) => {
    e.preventDefault();
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
    navigate(`/profile/${user?.uid.slice(0, 6)}`);
  };

  return (
    <div className="edit-profile">
      <Sidebar userImg={user?.photoURL} username={user?.displayName} />
      <div className="edit-container">
        <form className="edit-profile-wrapper" onSubmit={atualizaTeste} >
          <div className="edit-profile-data" >
            <input className="edit-profile-img" type="text" placeholder="Profile Picture" onChange={e => setPhotoURL(e.target.value)} required />
            <input className="edit-profile-h1" type="text" placeholder={user?.displayName} onChange={e => setDisplayName(e.target.value)} required />
          
            <button onClick={() => navigate(`/profile/${user?.uid.slice(0, 6)}`)}>
              <AiFillCloseCircle size={25} color="#A084E8" />
            </button>
            <button type="submit">
              <AiFillCheckCircle size={25} color="#A084E8" />
            </button>
          </div>
        </form>
        <div className="p-posts">
          {posts.map(post => {
            return (
              <Post 
                key={post.postId} 
                postImg={post.postImg} 
                username={post.username} 
                urlImg={post.userImg} 
                description={post.description}
                edit={true}
                id={post.postId}
              />
            );
          })}
        </div>
      </div> 
    </div>
  );
};

export default EditProfile;
