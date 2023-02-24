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
    console.log(payload);

    const { user } = await signInWithEmailAndPassword(
      auth,
      payload?.submitData?.email,
      payload?.submitData?.password
    );

    // console.log(user);

    payload?.onSuccess(user);

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

export const logOutUserThunk = createAsyncThunk(
  'auth/loginUserThunk',
  async (payload, thunkAPI) => {
    try {
      signOut(auth);

      payload?.onSuccess();
      console.log('Sign-out successful');
      return;
    } catch (error) {
      console.log(error);
      payload?.onError();
    }
  }
);
