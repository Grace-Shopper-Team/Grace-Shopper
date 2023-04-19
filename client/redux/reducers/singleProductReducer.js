import { createSlice } from '@reduxjs/toolkit';
import {
  addProductToCart,
  fetchSingleProduct,
} from '../actions/singleProductActions';

export const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState: {
    singleProduct: null,
    cart: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.singleProduct = action.payload;
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.cart.push(action.payload);
    });
  },
});

export default singleProductSlice.reducer;
