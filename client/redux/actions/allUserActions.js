import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllUsersAsync = createAsyncThunk(
  'users/fetchAll',
  async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {authorization: `${token} `},
      };
      const { data } = await axios.get('/auth/users', config);
      console.log(data)
      return data;
    } catch (error) {
      console.error('error fetching user data', error);
    }
  }
);

export const fetchSingleUserAsync = createAsyncThunk(
  'users/fetchSingle',
  async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { authorization: `${token} `},
      };
      const { data } = await axios.get(`/auth/users/${id}`, config);
      return data;
    } catch (error) {
      console.error('error fetching user data', error);
    }
  }
);
