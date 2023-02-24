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
      // console.log(payload);

      const newUwer = await createUserWithEmailAndPassword(
        auth,
        payload.submitData?.email,
        payload.submitData?.password
      );

      console.log('newUwer', newUwer);

      const updatedNewUser = await updateProfile(auth.currentUser, {
        displayName: login,
        // photoURL: "https://example.com/jane-q-user/profile.jpg",
      });

      console.log('updatedNewUser', updatedNewUser);

      const { uid, displayName } = auth.currentUser;

      payload?.onSuccess({ uid, displayName });

      return { userId: uid, login: displayName };
    } catch (error) {
      console.log(error);
      payload?.onError(error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk('auth/loginUserThunk', async (payload, thunkAPI) => {
  try {
    // console.log(payload);

    const user = auth.currentUser;

    payload?.onSuccess({ uid, displayName });

    return user;
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
      const getUserData = () => {
        let userData = null;
        onAuthStateChanged(auth, user => {
          if (user) {
            userData = { user, stateChange: true };
          }
        });
        return userData;
      };

      const userData = getUserData();

      payload?.onSuccess(userData);

      return userData;
    } catch (error) {
      console.log(error);
      payload?.onError(error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
