import { createSlice } from '@reduxjs/toolkit';
import {
  addProductToCart,
  fetchAllCartAction,
  deleteCartItemAction,
  updateCartItemAction,
  fetchOrderInfo, // Import fetchOrderInfo action
} from '../actions/cartActions';
const initialState = {
  cartItems: [],
  product: null,
  productName: '',
  orderConfirmation: { // Add orderConfirmation to initialState
    customerEmail: '',
    orderTotal: 0,
    paymentStatus: '',
  },
  error: null,
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
    builder.addCase(updateCartItemAction.fulfilled, (state, action) => {
      const { productId, quantity } = action.payload;
      const updatedProductIdx = state.cartItems
        .map(function (e) {
          return e.productId;
        })
        .indexOf(productId);
      if (updatedProductIdx !== -1) {
        state.cartItems[updatedProductIdx].productId = productId;
        state.cartItems[updatedProductIdx].quantity = quantity;
      }
    })
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      console.log('state.addCart ===', state, action);
      state.cartItems.push(action.payload);
    });
    builder.addCase(fetchOrderInfo.fulfilled, (state, action) => {
      state.orderConfirmation.customerEmail = action.payload.customer.email;
      state.orderConfirmation.orderTotal = action.payload.session.amount_total;
      state.orderConfirmation.paymentStatus = action.payload.session.payment_status;
    });
    builder.addCase(fetchOrderInfo.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});
export const selectCart = (state) => {
  return state.cart.cartItems;
};
export default cartSlice.reducer;
