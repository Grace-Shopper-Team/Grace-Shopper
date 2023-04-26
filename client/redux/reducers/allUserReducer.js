import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUsersAsync } from '../actions/allUserActions';
import {
  deleteSingleUserAsync,
  makeUserAdminAsync,
  removeUserAdminAsync,
  getUsersOrdersAsync,
} from '../actions/additionalUserActions.js';

export const allUsersSlice = createSlice({
  name: 'users',
  initialState: { users: [], orders: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(deleteSingleUserAsync.fulfilled, (state, action) => {
      const deletedUserId = action.payload.id;
      console.log('deleted User Id: ', deletedUserId);
      const index = state.users.findIndex((user) => user.id === deletedUserId);
      if (index !== -1) {
        state.users.splice(index, 1);
      }
    });
    builder.addCase(makeUserAdminAsync.fulfilled, (state, action) => {
      const newAdmin = action.payload;
      const userIndex = state.users.findIndex(
        (user) => user.id === newAdmin.id
      );

      if (userIndex !== -1) {
        state.users[userIndex].isAdmin = true;
      }
    });
    builder.addCase(removeUserAdminAsync.fulfilled, (state, action) => {
      const oldAdmin = action.payload;
      const userIndex = state.users.findIndex(
        (user) => user.id === oldAdmin.id
      );

      if (userIndex !== -1) {
        state.users[userIndex].isAdmin = false;
      }
    });
    builder.addCase(getUsersOrdersAsync.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export const selectUsers = (state) => {
  return state.auth.users;
};

export const selectOrders = (state) => state.auth.orders;

export default allUsersSlice.reducer;
