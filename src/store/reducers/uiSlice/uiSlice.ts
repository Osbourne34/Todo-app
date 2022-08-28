import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface uiSliceState {
    isShowSidebar: boolean;
}

const initialState: uiSliceState = {
    isShowSidebar: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsShowSidebar: (state) => {
            state.isShowSidebar = !state.isShowSidebar;
        },
    },
});

export const ui = (state: RootState) => state.ui;

export const { setIsShowSidebar } = uiSlice.actions;

export default uiSlice.reducer;
