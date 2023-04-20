<<<<<<< HEAD
import { createSlice } from '@reduxjs/toolkit';
import {
  addProductToCart,
  fetchAllCartAction,
  deleteProductCart,
  deleteCartItemAction,
} from '../actions/cartActions';
=======
import {  createSlice } from '@reduxjs/toolkit'
import {  addProductToCart, 
          fetchAllCartAction, 
          deleteProductCart, 
          deleteCartItemAction,
          updateCartItemAction
} from "../actions/cartActions";
>>>>>>> main

const initialState = {
  cartItems: [],
  product: null,
  productName: '',
<<<<<<< HEAD
};
=======
}
>>>>>>> main

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCartAction.fulfilled, (state, action) => {
    //run function obly when the action is done being dispathed
      state.cartItems = action.payload
    });

    builder.addCase(deleteCartItemAction.fulfilled, (state, action) => {
      const newCartItemState = state.cartItems.filter(cart => cart.productId != action.payload.productId)
      state.cartItems = newCartItemState
    });
//Case for updatedCartItems. (I need to work on the update input)
    builder.addCase(updateCartItemAction.fulfilled, (state, action) => {
      const { productId, quantity } = action.payload;
      const updatedProducts = state.cartProducts.map(product => {
        if (updatedProducts) {
          updatedProducts.productId = productId
          updatedProducts.quantity = quantity
        }
        //return product;
    })}) 

    builder.addCase(addProductToCart.fulfilled, (state, action) => {
        state.cartItems.push(action.payload); 
    });
  }
})

  reducers: {
    fetchAllCartItems: (state, action) => {},
<<<<<<< HEAD
    updateProductName: (state, action) => {
      state.productName = action.payload;
    },
  },
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
    // builder.addCase(fetchProductCart.fulfilled, (state, action) => {
    //     state.cart = action.payload;
    // });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.cartItems.push(action.payload);
    });
  },
});

//export const { todoAdded, todoToggled, todosLoading } = todosSlice.actions

export const { fetchAllCartItems, updateProductName } = cartSlice.actions;
export default cartSlice.reducer;

//https://redux.js.org/tutorials/fundamentals/part-8-modern-redux
=======

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

export const selectCart = (state) => {
  return state.cart;
};
export default cartSlice.reducer

>>>>>>> main
