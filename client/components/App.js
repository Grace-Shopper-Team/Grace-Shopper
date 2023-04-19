import React from 'react';
import Home from '../components/Home';
import { Routes, Route } from 'react-router';
import SingleProduct from '../components/singleproduct/singleproduct';
import { Login } from './Login';
import { Register } from './Register';
import { Profile } from './Profile';
import Cart from './Cart';
import Checkout from './checkout';

export const App = () => {
  return (
    <div id='app-container'>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/coffee/:id' element={<SingleProduct />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/:userID' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />}/>
      </Routes>
    </div>
  );
};
