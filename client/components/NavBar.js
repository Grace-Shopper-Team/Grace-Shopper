import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='nav-container'>
      <div className='logo-name'>
        <Link to='/home'>
          <img
            src='https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29mZmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
            id='logo-img'
          />
        </Link>
        <Link id='name' className='nav-bar-links' to='/home'>
          Our Coffee Shop
        </Link>
      </div>
      <div className='all-links'>
        <Link className='nav-bar-links' to='/home'>
          Home
        </Link>
        <Link className='nav-bar-links' to='/login'>
          Log In
        </Link>
        <Link className='nav-bar-links' to='/register'>
          Register
        </Link>
        <Link className='nav-bar-links' to='/profile'>
          My Profile
        </Link>
        <Link className='nav-bar-links' to='/cart'>
          🛒
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
