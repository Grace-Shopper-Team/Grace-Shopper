import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCoffeeAsync,
  deleteCoffeeAsync,
  addCoffeeToStockAsync,
} from '../actions/allCoffeeActions';
import { updateProduct } from '../actions/singleProductActions';

export const allCoffeeSlice = createSlice({
  name: 'coffee',
  initialState: {
    allCoffee: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCoffeeAsync.fulfilled, (state, action) => {
        state.allCoffee = action.payload;
      })
      .addCase(addCoffeeToStockAsync.fulfilled, (state, action) => {
        state.allCoffee.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedCoffee = action.payload;
        const index = state.allCoffee.findIndex(
          (coffee) => coffee.id === updatedCoffee.id
        );
        if (index !== -1) {
          state.allCoffee[index] = updatedCoffee;
        }
      })
      .addCase(deleteCoffeeAsync.fulfilled, (state, action) => {
        const deletedCoffeeId = action.payload.id;
        const index = state.allCoffee.findIndex(
          (coffee) => coffee.id === deletedCoffeeId
        );
        if (index !== -1) {
          state.allCoffee.splice(index, 1);
        }
      });
  },
});

export const allCoffeeSelector = (state) => state.coffee.allCoffee;

export default allCoffeeSlice.reducer;
