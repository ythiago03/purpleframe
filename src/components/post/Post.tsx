import React from 'react';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import './Post.css';

const Post = ({urlImg, description, username, postImg}) => {
  return (
    <div className="post">
      <div className="user">
        <img className="profile-pic" src={urlImg} alt="Profile Picture" />
        <h1>{username}</h1>
      </div>

      <div className="post-wrapper">
        <div className="postImg">
          <img className="post-img" src={postImg} alt="Post Picture" />
        </div>
        <div className="post-settings">
          <button>
            <AiOutlineHeart color="#A084E8"  size={35} /> 
          </button>
          <span>0</span>
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
