import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUsersAsync } from '../actions/allUserActions';
import {
  deleteSingleUserAsync,
  makeUserAdminAsync,
  removeUserAdminAsync,
} from '../actions/additionalUserActions.js';

export const allUsersSlice = createSlice({
  name: 'users',
  initialState: { users: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(deleteSingleUserAsync.fulfilled, (state, action) => {
      const deletedUserId = action.payload.id;
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
  },
});

export const selectUsers = (state) => {
  return state.auth.users;
};

export default allUsersSlice.reducer;
