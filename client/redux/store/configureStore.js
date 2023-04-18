import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import allCoffeeReducer from '../reducers/allCoffeeReducer';

// configure store
const store = configureStore({
  reducer: {
    auth,
    coffee: allCoffeeReducer,
  },
});

export default store;
