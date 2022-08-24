import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/authApi/authApi';
import AuthReducer from './reducers/authSlice/authSlice';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        [authApi.reducerPath]: authApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;