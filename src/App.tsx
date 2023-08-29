import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Login/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile';

import './main.css';




function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/createPost" element={<CreatePost />}/>
        <Route path="/profile/:profileId" element={<Profile />}/>
        <Route path="/editProfile/:profileId" element={<EditProfile />}/>
      </Routes>
    </Router>
  );
}

export default App;
