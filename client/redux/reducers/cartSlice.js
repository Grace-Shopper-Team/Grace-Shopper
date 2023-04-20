import { createSlice } from '@reduxjs/toolkit'
import { addProductToCart, fetchAllCartAction, deleteProductCart, deleteCartItemAction } from "../actions/cartActions";

const initialState = {
  cartItems: [],
  product: null,
  productName: '',
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchAllCartItems: (state, action) => {},

    updateProductName: (state, action) => {
      state.productName = action.payload;
    },

  },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCartAction.fulfilled, (state, action) => {
          //run function obly when the action is done being dispathed
          state.cartItems = action.payload;
        });
        builder.addCase(deleteCartItemAction.fulfilled, (state, action) => {
          const newCartItemState = state.cartItems.filter((cart) => cart.productId != action.payload.productId);
          state.cartItems = newCartItemState
        });
      
        builder.addCase(addProductToCart.fulfilled, (state, action) => {
            state.cartItems.push(action.payload); 
        });
    }
  
})


export const {fetchAllCartItems, updateProductName} = cartSlice.actions
export default cartSlice.reducer

