import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';


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
