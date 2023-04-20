import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleProduct = createAsyncThunk(
  'singleProduct/fetchOne',
  async (id) => {
    try {
      const response = await axios.get(`/api/coffee/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('error');
    }
  }
);

export const addProductToCart = createAsyncThunk(
  'coffee/addProductToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      console.log('inside of thunk', productId, quantity);
      const { data } = await axios.post('/api/coffee/cart', {
        productId,
        quantity,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Unable to add product to cart');
    }
  }
);
