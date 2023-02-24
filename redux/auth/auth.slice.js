import { createSlice } from '@reduxjs/toolkit';
import {
  registerUserThunk,
  logInUserThunk,
  authStateChangedThunk,
  logOutUserThunk,
} from './auth.thunks';

const initialState = {
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
  initialState: initialState,
  extraReducers: {
    [registerUserThunk.fulfilled]: (state, { payload }) => {
      console.log('register action ========>>>', payload);
      const { displayName, email, photoURL, uid } = payload;
      state.user = { displayName, email, photoURL, uid };
      state.stateChange = true;
    },
    [registerUserThunk.pending]: (state, { payload }) => {},
    [registerUserThunk.rejected]: (state, { payload }) => {
      state.error === payload;
    },

    [logInUserThunk.fulfilled]: (state, { payload }) => {
      console.log('state login action ================>>>', payload);

      const { displayName, email, photoURL, uid } = payload;
      state.user = { displayName, email, photoURL, uid };
      state.stateChange = true;
    },
    [logInUserThunk.pending]: (state, { payload }) => {},
    [logInUserThunk.rejected]: (state, { payload }) => {
      console.log('state login ERROR ============>>>>', payload);
      state.error === payload;
    },

    [logOutUserThunk.fulfilled]: (state, { payload }) => {
      // state = { ...initialState };
      state.stateChange = false;
    },
    [logOutUserThunk.pending]: (state, { payload }) => {},
    [logOutUserThunk.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    [authStateChangedThunk.fulfilled]: (state, { payload }) => {
      console.log('authStateChanged action ====>>>', payload);
      state.stateChange = payload?.stateChange;
    },
    [authStateChangedThunk.pending]: (state, { payload }) => {},
    [authStateChangedThunk.rejected]: (state, { payload }) => {
      state = initialState;
      state.error = payload;
    },
  },
});
