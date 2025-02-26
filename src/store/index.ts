import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';
import pointsReducer from './slices/pointsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    posts: postReducer,
    points: pointsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;