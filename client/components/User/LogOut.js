import React from 'react';
import { Link } from 'react-router-dom';

export const Logout = () => {
  return (
    <div>
      <h1>Logout successful!</h1>
      <Link className='nav-bar-links' to='/home'>
        Browse Coffee
      </Link>
    </div>
  );
};