import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';

// import your reducers here
// import yourReducer from './reducers/yourReducer'
import { dummyReducer } from '../reducers/yourReducer';

// configure store
const store = configureStore({
  reducer: {
    auth,
    dummy: dummyReducer,
  },
});

export default store;
