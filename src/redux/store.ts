import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import userAuthenticationReducer, { UserAuthenticationState } from './auth/userAuthenticationSlice';

interface ApplicationState {
    userAuthenticationReducer: UserAuthenticationState;
}

const persistConfig = {
    key: 'rootStore',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
};

const combinedReducers = combineReducers<ApplicationState>({
    userAuthenticationReducer,
});

const persistedReducer = persistReducer<ApplicationState>(persistConfig, combinedReducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
