import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userSlice from './slices/userSlice';
import { authApi } from '@apis/authApi';
import { userApi } from '@apis/userApi';
import { reviewApi } from '@apis/reviewApi';
import { blogApi } from '@apis/blogApi';
import { feedbackApi } from '@apis/feedbackApi';
import { statisticApi } from '@apis/statisticApi';
import { livestreamApi } from '@apis/livestreamApi';
import { connectionApi } from '@apis/connectionApi';

const store = configureStore({
  reducer: {
    user: userSlice,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [statisticApi.reducerPath]: statisticApi.reducer,
    [livestreamApi.reducerPath]: livestreamApi.reducer,
    [connectionApi.reducerPath]: connectionApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      reviewApi.middleware,
      blogApi.middleware,
      feedbackApi.middleware,
      statisticApi.middleware,
      livestreamApi.middleware,
      connectionApi.middleware,
    );
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
