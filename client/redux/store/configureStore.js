import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import allCoffeeReducer from '../reducers/allCoffeeReducer';

// import your reducers here
// import yourReducer from './reducers/yourReducer'
import singleProductReducer from '../reducers/singleProductReducer';

// configure store
const store = configureStore({
  reducer: {
    auth,
    coffee: allCoffeeReducer,
    singleProduct: singleProductReducer,
  },
});

export default store;
