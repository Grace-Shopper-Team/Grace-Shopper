import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='nav-container'>
      <div className='logo-name'>
        <img
          src='https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29mZmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
          id='logo-img'
        />
        <p>Our Coffee Shop</p>
      </div>
      <div className='all-links'>
        <Link className='nav-bar-links' to='/home'>
          Home
        </Link>
        <Link className='nav-bar-links' to='/account'>
          Account
        </Link>
        <Link className='nav-bar-links' to='/cart'>
          🛒
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
