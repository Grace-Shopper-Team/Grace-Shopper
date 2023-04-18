import React from 'react';
import Home from '../components/Home';
import { Routes, Route } from 'react-router';
import { Login } from './Login';
import { Register } from './Register';
// import { Admin } from './Admin';

export const App = () => {
  return (
    <div id='app-container'>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/admin' element={<Admin />} /> */}
      </Routes>
    </div>
  );
};
