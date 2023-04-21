import { createSlice } from '@reduxjs/toolkit';
import {
  addProductToCart,
  fetchAllCartAction,
  deleteProductCart,
  deleteCartItemAction,
  updateCartItemAction,
} from '../actions/cartActions';

const initialState = {
  cartItems: [],
  product: null,
  productName: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCartAction.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
    builder.addCase(deleteCartItemAction.fulfilled, (state, action) => {
      const newCartItemState = state.cartItems.filter(
        (cart) => cart.productId != action.payload.productId
      );
      state.cartItems = newCartItemState;
    });
    //Case for updatedCartItems. (I need to work on the update input)
    builder.addCase(updateCartItemAction.fulfilled, (state, action) => {
      const { productId, quantity } = action.payload;
      console.log('state.cartItems ===', state.cartItems);
      const updatedProductIdx = state.cartItems
        .map(function (e) {
          return e.productId;
        })
        .indexOf(action.payload.productId);
      if (updatedProductIdx) {
        state.cartItems[updatedProductIdx].productId = productId;
        state.cartItems[updatedProductIdx].quantity = quantity;
      }
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      console.log('state.addCart ===', state, action);
      state.cartItems.push(action.payload);
    });
  },
});

export const selectCart = (state) => {
  return state.cart.cartItems;
};
export default cartSlice.reducer;
