import { useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';


import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsFillTrash2Fill } from 'react-icons/bs';
import './Post.css';
import { Post as PostInterface} from '../../interfaces/interfaces';

const Post = ({urlImg, description, username, postImg, edit = false, id = ''}: PostInterface) => {

  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    setLike(prev => !prev);
    like 
      ? setLikeCount(likeCount - 1)
      : setLikeCount(likeCount + 1);
  };

  const removePost = async () => {
    await deleteDoc(doc(db, 'posts', id));
    console.log('excluir:' + id);
    
  };

  return (
    <div className="post">
      <div className="user">
        <img className="profile-pic" src={urlImg} alt="Profile Picture" />
        <h1>{username}</h1>
        {edit && <button className="trash-btn" onClick={removePost} >
          <BsFillTrash2Fill color="#A084E8"  size={35} />
        </button>}
      </div>

      <div className="post-wrapper">
        <div className="postImg">
          <img className="post-img" src={postImg} alt="Post Picture" />
        </div>
        <div className="post-settings">
          <button onClick={handleLike}>
            {like 
              ? <AiFillHeart color="#A084E8"  size={35} /> 
              : <AiOutlineHeart color="#A084E8"  size={35} /> 
            }
          </button>
          <span>{likeCount}</span>
        </div>
        <div className="post-description">
          <div className="desc-wrapper">
            <img src={urlImg} />
            <span >{username}</span>
          </div>
          <p>{description}</p>
        </div>
      </div>
      
    </div>
  );
};

export default Post;
