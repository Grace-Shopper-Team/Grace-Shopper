import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';

// import your reducers here
// import yourReducer from './reducers/yourReducer'
import singleProductReducer from '../reducers/singleProductReducer';

// configure store
const store = configureStore({
  reducer: {
    auth,
    singleProduct:singleProductReducer
  },
});

export default store;
