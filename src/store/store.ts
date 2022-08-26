import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from './reducers/authSlice/authSlice';
import { categoriesApi } from './api/categoriesApi';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(categoriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
