import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Post, Comment } from '../../types';
import { MOCK_POSTS, MOCK_COMMENTS } from '../../services/mockData';

interface PostState {
  posts: Post[];
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: MOCK_POSTS,
  comments: MOCK_COMMENTS,
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPosts,
  addPost,
  updatePost,
  removePost,
  setComments,
  addComment,
  setLoading,
  setError,
} = postSlice.actions;

export default postSlice.reducer;