import React from 'react';
import Home from '../components/Home';
import { Routes, Route } from 'react-router';
import AllCoffee from './AllCoffee/AllCoffee';
import { Login, Signup } from './AuthForm';
import NavBar from './NavBar';

export const App = () => {
  return (
    <div id='app-container'>
      <NavBar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
};
