import React, { useState, useEffect } from 'react';
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
import GuessForm from './GuessForm';
import jwt_decode from 'jwt-decode';

export const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt_decode(token);
        setUserId(decodedToken.id);
        setIsAdmin(decodedToken.isAdmin);
      } else {
        setUserId(null);
        setIsAdmin(false);
      }
    };

    checkToken();
    window.addEventListener('storage', (event) => {
      if (event.key === 'token' && !event.newValue) {
        setUserId(null);
        setIsAdmin(false);
      }
    });

    return () => {
      window.removeEventListener('storage');
    };
  }, []);

  return (
    <div id='app-container'>
      <NavBar isAdmin={isAdmin} userId={userId} />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/coffee/:id' element={<SingleProduct />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/:userID' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/logout' element={<Logout />} />
        <Route
          path='/admindashboard'
          element={<AdminDashboard isAdmin={isAdmin} />}
        />
        <Route path='/cart/coffee/:id' element={<SingleProduct />} />
        <Route path='/GuessForm' element={<GuessForm />} />
      </Routes>
    </div>
  );
};
