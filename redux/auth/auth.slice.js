import { createSlice } from '@reduxjs/toolkit';
import {
  registerUserThunk,
  loginUserThunk,
  authStateChangedThunk,
  logOutUserThunk,
} from './auth.thunks';

const state = {
  user: {
    displayName: null,
    email: null,
    photoURL: null,
    uid: null,
  },
  userId: null,
  login: null,
  error: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  extraReducers: {
    [registerUserThunk.fulfilled]: (state, { payload }) => {
      const { displayName, email, photoURL, uid } = payload;
      state.user = { displayName, email, photoURL, uid };
      state.stateChange = true;
    },
    [registerUserThunk.pending]: (state, { payload }) => {},
    [registerUserThunk.rejected]: (state, { payload }) => {
      state.error === payload;
    },

    [loginUserThunk.fulfilled]: (state, { payload }) => {
      console.log('state login action', payload);
      const { displayName, email, photoURL, uid } = payload;
      state.user = { displayName, email, photoURL, uid };
      stateChange = true;
    },
    [loginUserThunk.pending]: (state, { payload }) => {},
    [loginUserThunk.rejected]: (state, { payload }) => {
      console.log('state login', payload);
      state.error === payload;
    },

    [logOutUserThunk.fulfilled]: (state, { payload }) => {
      state.login = null;
      state.userId = null;
    },
    [logOutUserThunk.pending]: (state, { payload }) => {},
    [logOutUserThunk.rejected]: (state, { payload }) => {},

    [authStateChangedThunk.fulfilled]: (state, { payload }) => {
      state.stateChange = true;
    },
    [authStateChangedThunk.pending]: (state, { payload }) => {},
    [authStateChangedThunk.rejected]: (state, { payload }) => {},
  },
});
