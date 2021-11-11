import React from 'react';
import House from '../pages/House';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/LoggedInView.css';

const LoggedInView = () => {
  return (
    <div className='LoggedInView'>
      <div className='TopBar'>
        <Link className='link' to='/'>
          Home
        </Link>
        <Link className='link' to='/house'>
          Houses
        </Link>
        <Link className='link' to='/user'>
          Profile
        </Link>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/house' element={<House />} />
        <Route path='/user' element={<Profile />} />
      </Routes>
    </div>
  );
};

export default LoggedInView;
