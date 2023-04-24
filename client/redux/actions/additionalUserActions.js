import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteSingleUserAsync = createAsyncThunk(
  'users/deleteOne',
  async (id) => {
    try {
      const response = await axios.delete(`/api/user/${id}`);
      return response.data;
    } catch (error) {
      console.error('error deleting user', error);
    }
  }
);
