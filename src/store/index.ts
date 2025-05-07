import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './theme/themeSlice';
import authReducer from './auth/slice';
import uploadReducer from './upload/uploadSlice';
import apiKeysReducer from './apiKeys/apiKeysSlice';
import audioReducer from './audio/audioSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  upload: uploadReducer,
  apiKeys: apiKeysReducer,
  audio: audioReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme'], // Only auth and theme will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;