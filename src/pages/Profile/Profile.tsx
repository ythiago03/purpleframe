import { useEffect, useState } from 'react';

import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs } from 'firebase/firestore';

import { Link } from 'react-router-dom';

import {AiFillEdit} from 'react-icons/ai';

import Sidebar from '../../components/sidebar/Sidebar';

import Post from '../../components/post/Post';
import './Profile.css';
import { Post as PostInterface} from '../../interfaces/interfaces';

const Profile = () => {

  const [posts, setPosts] = useState<PostInterface[] | null>(null);
  const [user] = useAuthState(auth);
  const postsRef = collection(db, 'posts');
  // const bgImg = 'https://cutewallpaper.org/21/pixel-wallpaper-gif/gif-Backgrounds-Wallpaper-Cave.gif';
  // const profileStyle = {
  //   background: `url(${bgImg})`,
  //   backgroundPosition: 'center',
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  // };

  const getPosts = async () => {
    const posts =  await getDocs(postsRef);
    setPosts(posts?.docs
      .map(doc => ({...doc.data(), postId: doc.id,}))
      .filter(({userId}: PostInterface) => (userId == user?.uid)) as PostInterface[]);
  };

  useEffect(() => {
    getPosts();
  }, [posts]);

  return (
    <div className="profile">
      <Sidebar userImg={user?.photoURL} username={user?.displayName} />
      <div className="profile-wrapper">
        <div className="profile-data">
          <img src={user?.photoURL 
            ? user?.photoURL 
            : 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg'
          } alt="Profile Picture" />
          <h1>@{user?.displayName 
            ? user?.displayName 
            : 'User'
          }</h1>
          <Link to={`/editProfile/${user?.uid.slice(0, 6)}`}>
            <AiFillEdit size={25} color="#A084E8" />
          </Link>
        </div>
        <div className="p-posts">
          {posts?.map((post: PostInterface) => {
            return (
              <Post 
                key={post.postId} 
                postImg={post.postImg} 
                username={post.username} 
                urlImg={post.userImg!} 
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
