import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const NavBar = () => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserId(decodedToken.id);
      setToken(token);
    } else {
      setUserId(null);
      setToken(null);
    }
    return token;
  };

  useEffect(() => {
    checkToken();
    window.addEventListener('storage', (event) => {
      if (event.key === 'token' && !event.newValue) {
        setUserId(null);
        setToken(null);
      }
    });
    return () => {
      window.removeEventListener('storage');
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserId(null);
    setToken(null);
  };
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
      {userId && token ? (
        <div className='all-links'>
          <Link className='nav-bar-links' to='/home'>
            Home
          </Link>
          <Link className='nav-bar-links' to='/admindashboard'>
            Admin
          </Link>
          {/* <Link className='nav-bar-links' to='/login'>
            Log In
          </Link> */}
          <Link
            className='nav-bar-links'
            to={token ? `/profile/${userId}` : '/login'}>
            My Profile
          </Link>
          <Link className='nav-bar-links' to='/logout' onClick={handleLogout}>
            Logout
          </Link>
        </div>
      ) : (
        <div className='all-links'>
          <Link className='nav-bar-links' to='/home'>
            Home
          </Link>
          <Link className='nav-bar-links' to='/login'>
            Log In
          </Link>
          <Link className='nav-bar-links' to='/cart'>
            🛒
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
