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

// export const fetchAllUsersAsync = createAsyncThunk(
//   'users/fetchAll',
//   async () => {
//     console.log("test")
//     try {
//       const token = window.localStorage.getItem(TOKEN);
//       console.log('Headers:', {
//         authorization: token,
//         test: 'test'
//       });
//       const { data } = await axios.get('/auth/users', {
//         headers: {
//           authorization: token,
//           test: "test"
//         },
//       });
//       return data;
//     } catch (error) {
//       console.error('error fetching user data', error);
//     }
//   }
// );
