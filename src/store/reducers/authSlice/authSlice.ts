import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface AuthState {
    isAuth: boolean;
}

const initialState: AuthState = {
    isAuth: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
    },
});

export const auth = (state: RootState) => state.auth;

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;