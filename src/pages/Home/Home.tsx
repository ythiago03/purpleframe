import React, { useEffect, useState } from 'react';
//Firebase imports
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { getDocs, collection, orderBy} from 'firebase/firestore';
//Router-DOM imports
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//Local imports
import Sidebar from '../../components/sidebar/Sidebar';
import './Home.css';
import Post from '../../components/post/Post';

const Home = () => {
  //PurpleFrame
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
    <div className="home">
      <Sidebar userImg={user?.photoURL} username={user?.displayName}/>
      <div className="posts">
        <h1>Welcome {user?.displayName}!</h1>
        <span>Your is is {user?.uid}</span>
        <Link to={'/createPost'}>Create a new post</Link>

        <div>
          {/* <Post key={post.postId} postImg={post.postImg} username={post.username} urlImage={post.urlImg} description={posts.description}/> */}
      
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

export default Home;
