import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
// import { auth } from '../../firebase/config';

export const getAllPostsThunk = createAsyncThunk('posts/getAllPostsThunk', async payload => {
  try {
    // payload?.onSuccess();

    return payload?.data;
  } catch (error) {
    console.log(error);
    // payload?.onError(error);
  }
});

export const getMyPostsThunk = createAsyncThunk('posts/getMyPostsThunk', async () => {
  let response;
  try {
    const querySnapshot = await onSnapshot(
      query(collection(firestoreDB, 'posts'), where('userId', '==', userId)),
      data => {
        // console.log("data.docs: ============>", data);
        response = data;
      }
    );

    // payload?.onSuccess();

    return response;
  } catch (error) {
    console.log(error);
    // payload?.onError(error);
  }
});
