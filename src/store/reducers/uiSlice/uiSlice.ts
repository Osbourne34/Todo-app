import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface uiSliceState {
    isShowSidebar: boolean;
    isShowStatistics: boolean;
}

const initialState: uiSliceState = {
    isShowSidebar: false,
    isShowStatistics: true,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsShowSidebar: (state) => {
            state.isShowSidebar = !state.isShowSidebar;
        },
        setIsShowStatistics: (state) => {
            state.isShowStatistics = !state.isShowStatistics;
        },
    },
});

export const ui = (state: RootState) => state.ui;

export const { setIsShowSidebar, setIsShowStatistics } = uiSlice.actions;

export default uiSlice.reducer;
