import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllUsersAsync = createAsyncThunk(
  'users/fetchAll',
  async () => {
    try {
      const { data } = await axios.get('/auth/users');
      return data;
    } catch (error) {
      console.error('error fetching user data', error);
    }
  }
);