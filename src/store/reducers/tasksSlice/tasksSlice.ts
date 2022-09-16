import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface tasksState {
    page: number;
    limit: number;
    numberOfTasks: 1 | 0;
    sortType: 'default' | 'desc' | 'asc';
    orderBy: string | null;
}

const initialState: tasksState = {
    page: 0,
    limit: 5,
    numberOfTasks: 0,
    sortType: 'default',
    orderBy: null,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },
        setNumberOfTasks(state, action: PayloadAction<0 | 1>) {
            state.numberOfTasks = action.payload;
        },
        setSortType(state, action: PayloadAction<'default' | 'desc' | 'asc'>) {
            switch (action.payload) {
                case 'default':
                    state.sortType = 'desc';
                    break;
                case 'desc':
                    state.sortType = 'asc';
                    break;
                default:
                    state.sortType = 'default';
            }
        },
        setOrderBy(state, action: PayloadAction<string>) {
            state.orderBy = action.payload;
        },
        clearSort(state) {
            state.orderBy = null;
            state.sortType = 'default';
        },
    },
});

export const tasks = (state: RootState) => state.tasks;

export const {
    setPage,
    setLimit,
    setNumberOfTasks,
    setSortType,
    setOrderBy,
    clearSort,
} = tasksSlice.actions;

export default tasksSlice.reducer;
