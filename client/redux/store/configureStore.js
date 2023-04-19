import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import allCoffeeReducer from '../reducers/allCoffeeReducer';

// import your reducers here
// import yourReducer from './reducers/yourReducer'
import singleProductReducer from '../reducers/singleProductReducer';
import  cartSlice  from '../reducers/cartSlice';

// configure store
const store = configureStore({
  reducer: {
    auth,
    coffee: allCoffeeReducer,
    singleProduct: singleProductReducer,
    cart: cartSlice
  },
});

export default store;
