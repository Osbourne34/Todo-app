import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface searchState {
    searchValue: string;
}

const initialState: searchState = {
    searchValue: '',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
    },
});

export const search = (state: RootState) => state.search;

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
