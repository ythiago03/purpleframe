import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';

const Home = () => {
  
  const [user] = useAuthState(auth);//recebe os dados de usuário atual
  const [posts, setPosts] = useState([]);

  const postsRef = collection(db, 'posts');
  const navigate = useNavigate();

  const getPosts = async () => {
    const posts =  await getDocs(postsRef);
    setPosts(posts.docs.map(doc => ({...doc.data(), postId: doc.id,})));
  };

  useEffect(() => {
    if(!user)navigate('/login');//caso não haja usuário, redireciona para a pag de login
    getPosts();
  }, []);

  return (
    <div>
      <h1>Welcome {user?.displayName}!</h1>
      <span>Your is is {user?.uid}</span>
      <Link to={'/createPost'}>Create a new post</Link>

      <div>
        {posts.map(post => {
          return (
            <div key={post.postId}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <span>@{!post.username ? `User: ${post.userId}` : post.username }</span>
            </div>  
          );
        })}
      </div>
    </div>
  );
};

export default Home;
