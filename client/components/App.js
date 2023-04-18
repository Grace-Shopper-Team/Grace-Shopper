import React from 'react';
import Home from '../components/Home';
import { Routes, Route } from 'react-router';
import SingleProduct from './singleproduct/singleproduct';

// import { Login, Signup } from './AuthForm';

export const App = () => {
  return (
    <div id='app-container'>
      <h1>My App</h1>
      <p>Add some cool stuff here</p>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/allcoffee/:id' element={<SingleProduct />}> </Route>
      </Routes>
    
    </div>
  );
};
