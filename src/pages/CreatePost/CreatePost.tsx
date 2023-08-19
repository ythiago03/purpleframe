import React, { useState } from 'react';
import { db, auth } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

  const [user] = useAuthState(auth);
  const [postImg, setPostImg] = useState('');
  const [description, setDescription] = useState('');

  const postsRef = collection(db, 'posts');
  const navigate = useNavigate();

  const createPost = async (e) => {
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
    <div>
      Create a new Post
      <form>
        <input 
          type="text" 
          placeholder="Url Image" 
          onChange={e => setPostImg(e.target.value)}  
        />
        <textarea 
          name="description" 
          placeholder="Description"
          onChange={e => setDescription(e.target.value)}
        > 
        </textarea>
        <button onClick={createPost}>Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
