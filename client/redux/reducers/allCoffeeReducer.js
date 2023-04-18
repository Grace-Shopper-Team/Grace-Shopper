import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCoffeeAsync } from '../actions/allCoffeeActions';
import { useSelector } from 'react-redux';

export const allCoffeeSlice = createSlice({
  name: 'coffee',
  initialState: {
    allCoffee: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCoffeeAsync.fulfilled, (state, action) => {
      state.allCoffee = action.payload;
    });
  },
});

export const allCoffeeSelector = (state) => state.coffee.allCoffee;

export default allCoffeeSlice.reducer;
