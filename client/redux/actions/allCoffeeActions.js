import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllCoffeeAsync = createAsyncThunk(
  'coffee/fetchAll',
  async () => {
    try {
      const response = await axios.get('/api/coffee');
      return response.data;
    } catch (error) {
      console.error('error fetching all coffee data', error);
    }
  }
);

export const deleteCoffeeAsync = createAsyncThunk(
  'coffee/deleteOne',
  async (id) => {
    try {
      console.log('coffee id:', id);
      const response = await axios.delete(`/api/coffee/${id}`);
      return response.data;
    } catch (error) {
      console.error('error deleting coffee with id', error);
    }
  }
);

export const addCoffeeToStockAsync = createAsyncThunk(
  'coffee/addOne',
  async ({ name, price, description, imageUrl, roast, origin, stock }) => {
    try {
      const response = await axios.post('/api/coffee', {
        name,
        price,
        description,
        imageUrl,
        roast,
        origin,
        stock,
      });
      return response.data;
    } catch (error) {
      console.error('error adding coffee to shop stock', error);
    }
  }
);
