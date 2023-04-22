import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllUsersAsync = createAsyncThunk(
  'users/fetchAll',
  async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { authorization: `${token}` },
      };
      const { data } = await axios.get('/auth/users', config);
<<<<<<< HEAD
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
        headers: { authorization: `${token}` },
      };
      const { data } = await axios.get(`/auth/users/${id}`, config);
=======
      console.log(data);
>>>>>>> combined auth logic with current updates
      return data;
    } catch (error) {
      console.error('error fetching user data', error);
    }
  }
);

<<<<<<< HEAD
=======
export const fetchSingleUserAsync = createAsyncThunk(
  'users/fetchSingle',
  async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { authorization: `${token}` },
      };
      const { data } = await axios.get(`/auth/users/${id}`, config);
      return data;
    } catch (error) {
      console.error('error fetching user data', error);
    }
  }
);
>>>>>>> combined auth logic with current updates
