import React from 'react';
import Home from '../components/Home';
import { Routes, Route } from 'react-router';
import SingleProduct from '../components/singleproduct/singleproduct';
import { Login } from './User/Login';
import { Register } from './User/Register';
import { Profile } from './User/Profile';
import Cart from './Cart';
import NavBar from './NavBar';
import { Logout } from './User/Logout';
import AdminDashboard from './AllCoffee/AdminDashboard';

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
        <Route path='/logout' element={<Logout />} />
        <Route path='/admindashboard' element={<AdminDashboard />} />
        <Route path='/cart/coffee/:id' element={<SingleProduct />}/>
      </Routes>
    </div>
  );
};
