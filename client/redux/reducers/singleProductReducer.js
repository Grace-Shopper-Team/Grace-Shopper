import { createSlice } from '@reduxjs/toolkit';
import {
  addProductToCart,
  fetchSingleProduct,
} from '../actions/singleProductActions';

export const singleProductSlice = createSlice({
<<<<<<< HEAD
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
      console.log('inside of reducer', action.payload);
      state.cart.push(action.payload);
    });
  },
=======
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
    
    }
>>>>>>> main
});
export const cartSelector = (state) => state.singleProduct.cart;

export default singleProductSlice.reducer;
