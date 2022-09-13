import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from './reducers/authSlice/authSlice';
import SearchReducer from './reducers/searchSlice/searchSlice';
import UiReducer from './reducers/uiSlice/uiSlice';
import TasksReducer from './reducers/tasksSlice/tasksSlice';
import { categoriesApi } from './api/categoriesApi';
import { tasksApi } from './api/tasksApi';
import { prioritiesApi } from './api/prioritiesApi';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        search: SearchReducer,
        ui: UiReducer,
        tasks: TasksReducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
        [prioritiesApi.reducerPath]: prioritiesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            categoriesApi.middleware,
            tasksApi.middleware,
            prioritiesApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
