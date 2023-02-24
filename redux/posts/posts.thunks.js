import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
// import { auth } from '../../firebase/config';

export const getAllPostsThunk = createAsyncThunk('posts/getAllPostsThunk', async () => {
  let response;
  try {
    const querySnapshot = await onSnapshot(collection(firestoreDB, 'posts'), data => {
      // console.log("data.docs: ============>", data.docs[0].data());
      response = data;
    });

    payload?.onSuccess(response);

    return response;
  } catch (error) {
    console.log(error);
    payload?.onError(error);
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

    payload?.onSuccess(response);

    return response;
  } catch (error) {
    console.log(error);
    payload?.onError(error);
  }
});
