import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from './reducers/authSlice/authSlice';
import { categoriesApi } from './api/categoriesApi';
import { tasksApi } from './api/tasksApi';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            categoriesApi.middleware,
            tasksApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
