import React from 'react';
import Home from '../components/Home';
import { Routes, Route } from 'react-router';
import { Login, Signup } from './AuthForm';
import NavBar from './NavBar';
import SingleProduct from '../components/singleproduct/singleproduct';



export const App = () => {
  return (
    <div id='app-container'>
      <NavBar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/register' element={<Register />} />
        <Route path='/profile/:userId' element={<Profile/>}/> */}
        <Route path='/coffee/:id' element={<SingleProduct />}> </Route>
      </Routes>
    
    </div>
  );
};
