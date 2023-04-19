import React, { useEffect, useState } from 'react';

import { Routes, Route, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCartAction } from '../redux/actions/cartActions';


const Home = () => {

  //const { id: productId } = useParams();
    const dispatch = useDispatch();

  const cartProduct = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(fetchAllCartAction(2));
    }, [dispatch, 2]);

  return <div>Welcome Home!


<h1>My App</h1>
      <p>Add some cool stuff here</p>
  </div>;
};

export default Home;
