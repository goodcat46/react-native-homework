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
  try {
    const querySnapshot = await onSnapshot(collection(firestoreDB, 'posts'), data => {
      // console.log("data.docs: ============>", data.docs[0].data());
      setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    payload?.onSuccess(querySnapshot);

    return querySnapshot;
  } catch (error) {
    console.log(error);
    payload?.onError(error);
  }
});

export const getPostComentCount = createAsyncThunk('posts/getPostComentCount', async payload => {
  console.log(postId);
  try {
    const docRef = doc(firestoreDB, 'posts', postId);
    const commentsRef = collection(docRef, 'comments');
    const snapshot = await getDocs(commentsRef);
    console.log(snapshot.size);

    payload?.onSuccess(snapshot.size);

    return snapshot.size;
  } catch (error) {
    console.log(error);
    payload?.onError();
  }
});
