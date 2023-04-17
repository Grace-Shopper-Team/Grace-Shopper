import React from 'react';
import Home from '../components/Home';
import { Routes, Route } from 'react-router';
// import { Login, Signup } from './AuthForm';

export const App = () => {
  return (
    <div id='app-container'>
      <h1>My App</h1>
      <p>Add some cool stuff here</p>
      <Routes>
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
};
