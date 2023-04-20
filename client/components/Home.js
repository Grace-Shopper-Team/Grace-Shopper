import React, { useEffect, useState } from 'react';
import AllCoffee from './AllCoffee/AllCoffee';
import { Routes, Route, NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCartAction } from '../redux/actions/cartActions';

const Home = () => {
  return (
    <div>
      <AllCoffee />
    </div>
  );
};

export default Home;
