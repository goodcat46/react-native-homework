import { createSlice } from '@reduxjs/toolkit';
import { registerUserThunk, loginUserThunk, authStateChangedThunk } from './auth.thunks';

const state = {
  userId: null,
  login: null,
  error: null,
  stateChange: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOutUser: () => state,
  },
  extraReducers: {
    [registerUserThunk.fulfilled]: (state, { payload }) => {
      state.userId === payload.userId, state.login === payload.login;
    },
    [registerUserThunk.pending]: (state, { payload }) => {},
    [registerUserThunk.rejected]: (state, { payload }) => {
      state.error === payload;
    },

    [loginUserThunk.fulfilled]: (state, payload) => {
      console.log('state login action', payload);
    },
    [loginUserThunk.pending]: (state, { payload }) => {},
    [loginUserThunk.rejected]: (state, { payload }) => {
      console.log('state login', payload);
      state.error === payload;
    },

    [authStateChangedThunk.fulfilled]: (state, { payload }) => {},
    [authStateChangedThunk.pending]: (state, { payload }) => {},
    [authStateChangedThunk.rejected]: (state, { payload }) => {},
  },
});
