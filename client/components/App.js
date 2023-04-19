import React from 'react';
import Home from '../components/Home';
import { Routes, Route } from 'react-router';
<<<<<<< HEAD
import SingleProduct from '../components/singleproduct/singleproduct';
import { Login } from './Login';
import { Register } from './Register';
import { Profile } from './Profile';
import Cart from './Cart';
=======
import AllCoffee from './AllCoffee/AllCoffee';
import { Login, Signup } from './AuthForm';
>>>>>>> 62881b6b1ec7f2e48fe8502b4f1c94e89d959109
import NavBar from './NavBar';

export const App = () => {
  return (
    <div id='app-container'>
      <NavBar />
      <Routes>
        <Route path='/home' element={<Home />} />
<<<<<<< HEAD
        <Route path='/coffee/:id' element={<SingleProduct />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/:userID' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
=======
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
>>>>>>> 62881b6b1ec7f2e48fe8502b4f1c94e89d959109
      </Routes>
    </div>
  );
};
