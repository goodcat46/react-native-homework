import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/config';

export const registerUserThunk = createAsyncThunk(
  'auth/registerUserThunk',
  async (payload, thunkAPI) => {
    try {
      console.log('thunk payload', payload);

      const newUwer = await createUserWithEmailAndPassword(
        auth,
        payload.submitData?.email,
        payload.submitData?.password
      );

      const updatedNewUser = await updateProfile(auth.currentUser, {
        displayName: payload.submitData?.login,
        // photoURL: "https://example.com/jane-q-user/profile.jpg",
      });

      console.log('updatedNewUser', { newUwer, updatedNewUser });

      const { displayName, email, photoURL, uid } = auth.currentUser;

      payload?.onSuccess({ displayName, email, photoURL, uid });

      return { displayName, email, photoURL, uid };
    } catch (error) {
      console.log(error);
      payload?.onError(error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logInUserThunk = createAsyncThunk('auth/logInUserThunk', async (payload, thunkAPI) => {
  try {
    // console.log(payload);

    const { user } = await signInWithEmailAndPassword(
      auth,
      payload?.submitData?.email,
      payload?.submitData?.password
    );

    // console.log('login thunk ============>>>>>', user);

    payload?.onSuccess(user);
    const { displayName, email, photoURL, uid } = user;

    return { displayName, email, photoURL, uid };
  } catch (error) {
    console.log(error);
    payload?.onError(error);

    return thunkAPI.rejectWithValue(error.message);
  }
});

export const authStateChangedThunk = createAsyncThunk(
  'auth/authStateChangedThunk',
  async (payload, thunkAPI) => {
    try {
      payload?.onSuccess();

      return payload.data;
    } catch (error) {
      console.log(error);
      payload?.onError(error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutUserThunk = createAsyncThunk(
  'auth/logOutUserThunk',
  async (payload, thunkAPI) => {
    try {
      signOut(auth);

      payload?.onSuccess();
      return;
    } catch (error) {
      console.log(error);
      payload?.onError();
    }
  }
);
