import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Action for Cart products
export const fetchAllCartAction = createAsyncThunk(
  'cartProducts/fetchAllCartAction',
  async (id) => {
    try {
      const response = await axios.get(`/api/cart/cartItems/${id}`);
      console.log("fetchallCartaction");
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('error', error);
    }
  }
);

//Action for update a product Need To work on it (Not Working)
export const updateCartItemAction = createAsyncThunk(
  'cartProducts/updateCartItemAction',
  async ({ cartId, productId, quantity }) => {
    try {
      const response = await axios.put(`/api/cart/${cartId}/${productId}`, {
        quantity,
      });
      console.log('response data', response);
      return { productId, quantity };
    } catch (error) {
      console.error('error', error);
      return rejectWithValue('Unable to update cart item');
    }
  }
);


//Action for deleting a product
export const deleteCartItemAction = createAsyncThunk(
  'cartProducts/deleteCartItemAction',
  async (param) => {
    try {
      const { cartId, productId } = param;
      const response = await axios.delete(`/api/cart/${cartId}/${productId}`);
      console.log(response);
      return { success: true, productId };
    } catch (error) {
      console.error('error', error);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  'coffee/addProductToCart',
  async ({ productId, quantity, userId }, { rejectWithValue }) => {
    try {
      console.log('addProductToCart ===', productId, quantity, userId);
      const { data } = await axios.post('/api/cart/', {
        productId,
        quantity,
        userId,
      });
      console.log('add data check ===', data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Unable to add product to cart');
    }
  }
);
