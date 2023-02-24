import { createSlice } from '@reduxjs/toolkit';

import { getAllPostsThunk, getPostComentCount } from './posts.thunks';

const initialState = {
  posts: [{ location: '' }],
  error: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  extraReducers: {
    [getAllPostsThunk.fulfilled]: (state, { payload }) => {
      console.log('slice payload', payload);

      state.posts === [...payload, ...state.posts];
    },
  },
});
