import React from 'react';
import House from '../pages/House';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/LoggedInView.css';
import HouseView from '../pages/HouseView';
import Messages from '../pages/Messages';

interface Props {
  handleLogout: () => void;
}

const LoggedInView = ({ handleLogout }: Props) => {  
  return (
    <div className='LoggedInView'>
      <div className='TopBar'>
        <Link className='link' to='/'>
          Etusivu
        </Link>
        <Link className='link' to='/house'>
          Mökit
        </Link>
        <Link className='link' to='/user'>
          Profiili
        </Link>
        <button onClick={handleLogout}>Kirjaudu ulos</button>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/house' element={<House />} />
        <Route path='/user' element={<Profile />} />
        <Route path='/house/:id' element={<HouseView />} />
        <Route path='/house/:id/messages' element={<Messages />} />
      </Routes>
    </div>
  );
};

export default LoggedInView;
