import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateUser } from '../store/auth';

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

export const makeUserAdminAsync = createAsyncThunk(
  'users/makeAdmin',
  async (id, { dispatch }) => {
    try {
      const token = window.localStorage.getItem('token');
      const res = await axios.put(
        `/auth/users/${id}/admin`,
        { isAdmin: true },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(updateUser(res.data));
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const removeUserAdminAsync = createAsyncThunk(
  'users/removeAdmin',
  async (id, { dispatch }) => {
    try {
      const token = window.localStorage.getItem('token');
      const res = await axios.put(
        `/auth/users/${id}/admin`,
        { isAdmin: false },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(updateUser(res.data));
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);
