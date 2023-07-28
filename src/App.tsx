import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import NewPost from './pages/NewPost';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="login" element={<Login />}/>
        <Route path="newpost" element={<NewPost />}/>
      </Routes>
    </Router>
  );
}

export default App;
