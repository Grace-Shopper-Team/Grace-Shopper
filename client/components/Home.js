<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import AllCoffee from './AllCoffee/AllCoffee';
import { Routes, Route, NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCartAction } from '../redux/actions/cartActions';

const Home = () => {
  //const { id: productId } = useParams();
  // const dispatch = useDispatch();
  // const cartProduct = useSelector((state) => state.cart);

  // useEffect(() => {
  //   dispatch(fetchAllCartAction(2));
  // }, [dispatch, 2]);

=======
import React from 'react';
import AllCoffee from './AllCoffee/AllCoffee';

const Home = () => {
>>>>>>> 62881b6b1ec7f2e48fe8502b4f1c94e89d959109
  return (
    <div>
      <AllCoffee />
    </div>
  );
};

export default Home;
