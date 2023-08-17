import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Login/Register';
import CreatePost from './pages/CreatePost/CreatePost';

import './main.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/createPost" element={<CreatePost />}/>
      </Routes>
    </Router>
  );
}

export default App;
