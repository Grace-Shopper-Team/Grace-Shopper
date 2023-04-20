import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUsersAsync } from '../actions/allUserActions';

export const allUsersSlice = createSlice({
  name: 'users',
  initialState: { users: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const selectUsers = (state) => {
  return state.auth.users;
};

export default allUsersSlice.reducer;
