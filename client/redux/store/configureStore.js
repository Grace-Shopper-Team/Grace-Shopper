import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';

// import your reducers here
// import yourReducer from './reducers/yourReducer'
import { dummyReducer } from '../reducers/yourReducer';
import  cartSlice  from '../reducers/cartSlice';

// configure store
const store = configureStore({
  reducer: {
    auth,
    dummy: dummyReducer,
    cart: cartSlice
  },
});

export default store;
