import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { clockApi } from '../features/clock/clockApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [clockApi.reducerPath]: clockApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clockApi.middleware),
});
