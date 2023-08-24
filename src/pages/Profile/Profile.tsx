import React, { useEffect, useState } from 'react';

import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';

import {AiFillEdit} from 'react-icons/ai';
import './Profile.css';
import { collection, getDocs } from 'firebase/firestore';
import Post from '../../components/post/Post';

const Profile = () => {

  const [posts, setPosts] = useState([]);
  const [user] = useAuthState(auth);
  const postsRef = collection(db, 'posts');
 
  const getPosts = async () => {
    const posts =  await getDocs(postsRef);
    setPosts(posts.docs
      .map(doc => ({...doc.data(), postId: doc.id,}))
      .filter(post => (post.userId == user?.uid)));
  };

  useEffect(() => {
    getPosts();
  }, [posts]);

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
        <div className="p-posts">
          {posts.map(post => {
            return (
              <Post 
                key={post.postId} 
                postImg={post.postImg} 
                username={post.username} 
                urlImg={post.userImg} 
                description={post.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
