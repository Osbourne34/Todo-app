import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0,
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

export const selectCount = (state: RootState) => state.counter.value;

export const { decrement, increment } = counterSlice.actions;
