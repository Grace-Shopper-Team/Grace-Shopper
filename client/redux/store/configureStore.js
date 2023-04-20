import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import allCoffeeReducer from '../reducers/allCoffeeReducer';
import singleProductReducer from '../reducers/singleProductReducer';
import cartSlice from '../reducers/cartSlice';
import allUserReducer from '../reducers/allUserReducer';

const store = configureStore({
  reducer: {
    auth: allUserReducer,
    coffee: allCoffeeReducer,
    singleProduct: singleProductReducer,
    cart: cartSlice,
  },
});

export default store;
