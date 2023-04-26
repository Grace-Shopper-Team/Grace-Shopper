import React from 'react';
import { Login } from './User/Login';

const LandingPage = () => {
    return (
      <div className="landing-page-container">
        <img
          className="landing-page-img"
          src={'/beanhub.png'}
          alt="beanHub"
        />
        <div className="login-container">
          <div className="login-content">
            <Login />
          </div>
        </div>
      </div>
    );
  };
  
  

export default LandingPage;