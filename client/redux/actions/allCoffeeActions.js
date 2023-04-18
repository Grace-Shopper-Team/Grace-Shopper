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
