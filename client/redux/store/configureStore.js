import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import allCoffeeReducer from '../reducers/allCoffeeReducer';
<<<<<<< HEAD
import singleProductReducer from '../reducers/singleProductReducer';
import cartSlice from '../reducers/cartSlice';

=======

// configure store
>>>>>>> 62881b6b1ec7f2e48fe8502b4f1c94e89d959109
const store = configureStore({
  reducer: {
    auth,
    coffee: allCoffeeReducer,
<<<<<<< HEAD
    singleProduct: singleProductReducer,
    cart: cartSlice,
=======
>>>>>>> 62881b6b1ec7f2e48fe8502b4f1c94e89d959109
  },
});

export default store;
