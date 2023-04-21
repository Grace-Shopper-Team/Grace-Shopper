import { createSlice } from '@reduxjs/toolkit';
import {
  addProductToCart,
  fetchSingleProduct,
  updateProduct,
  //   toggleFavoriteProduct,
} from '../actions/singleProductActions';

export const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState: {
    singleProduct: null,
    cart: [],
    // favorites: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.singleProduct = action.payload;
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      console.log(action);
      state.cart.push(action.payload);
    });
    // builder.addCase(toggleFavoriteProduct.fulfilled, (state, action) => {
    //   const index = state.favorites.indexOf(action.payload);
    //   if (index === -1) {
    //     state.favorites.push(action.payload);
    //   } else {
    //     state.favorites.splice(index, 1);
    //   }
    // });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.singleProduct = action.payload;
    });
  },
});

export const cartSelector = (state) => state.singleProduct.cart;
export const favoritesSelector = (state) => state.singleProduct.favorites;

export default singleProductSlice.reducer;
