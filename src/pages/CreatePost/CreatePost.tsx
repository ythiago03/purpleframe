import React, { SyntheticEvent, useState } from 'react';
import { db, auth } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import './CreatePost.css';
import Sidebar from '../../components/sidebar/Sidebar';

const CreatePost = () => {

  const [user] = useAuthState(auth);
  const [postImg, setPostImg] = useState('');
  const [description, setDescription] = useState('');

  const postsRef = collection(db, 'posts');
  const navigate = useNavigate();

  const createPost = async (e: SyntheticEvent) => {
    e.preventDefault();
    await addDoc(postsRef ,{
      description,
      postImg,
      userId: user?.uid,
      username: user?.displayName,
      userImg: user?.photoURL
    });
    navigate('/');
  };

  return (
    <div className="create-wrapper">
      <Sidebar  userImg={user?.photoURL} username={user?.displayName}  />
      <div className="form">
        <form >
          <h1> Create a new Post</h1>
          <input 
            type="text" 
            placeholder="Add Image" 
            onChange={e => setPostImg(e.target.value)}  
          />
          <textarea 
            name="description" 
            placeholder="Description"
            onChange={e => setDescription(e.target.value)}
          > 
          </textarea>
          <button className="newPost-btn" onClick={createPost}>Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
