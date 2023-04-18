import React from 'react';
import Home from '../components/Home';
import { Routes, Route } from 'react-router';
import { Login, Signup } from './AuthForm';

export const App = () => {
  return (
    <div id='app-container'>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
};
