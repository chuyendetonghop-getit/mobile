import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';

import {appReducer} from './slices/app.slice';
import {authReducer} from './slices/auth.slice';
import {profileReducer} from './slices/profile.slice';
import {authApi} from '../api/auth.api';
import {postApi} from 'api/post.api';
import {conversationApi} from 'api/conversation.api';
import {messageApi} from 'api/message.api';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'cacheStorage', 'app', 'profile'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  profile: profileReducer,

  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [conversationApi.reducerPath]: conversationApi.reducer,
  [messageApi.reducerPath]: messageApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  //   @ts-ignore
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // disable all middleware for serializableCheck and immutableCheck in dev mode
      immutableCheck: false,
      serializableCheck: false,
    }).concat([
      authApi.middleware,
      postApi.middleware,
      conversationApi.middleware,
      messageApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
export const persistor = persistStore(store);
