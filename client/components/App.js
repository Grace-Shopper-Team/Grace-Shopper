import React from 'react';
import Home from '../components/Home';
import { Routes, Route } from 'react-router';
import SingleProduct from '../components/singleproduct/singleproduct';
import { Login } from './Login';
import { Register } from './Register';
import { Profile } from './Profile';
import Cart from './Cart';
import NavBar from './NavBar';

export const App = () => {
  return (
    <div id='app-container'>
      <NavBar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/coffee/:id' element={<SingleProduct />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/:userID' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
};
