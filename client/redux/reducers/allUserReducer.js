import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUsersAsync } from '../actions/allUserActions';
import { deleteSingleUserAsync } from '../actions/additionalUserActions.js';

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
  },
});

export const selectUsers = (state) => {
  return state.auth.users;
};

export default allUsersSlice.reducer;
