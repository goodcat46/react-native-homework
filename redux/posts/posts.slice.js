import { createSlice } from '@reduxjs/toolkit';

import { getAllPostsThunk, getMyPostsThunk } from './posts.thunks';

const initialState = {
  posts: [],
  myPosts: [],
  error: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  extraReducers: {
    [getAllPostsThunk.fulfilled]: (state, { payload }) => {
      console.log('slice allPosts', payload.docs);

      const posts = payload.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      state.posts === [...posts, ...state.posts];
    },
    [getMyPostsThunk.fulfilled]: (state, { payload }) => {
      // console.log('slice payload', payload);

      const posts = payload.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      state.myPosts === [...posts, ...state.myPosts];
    },
  },
});
