import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../models/IUser';
import { RootState } from '../../store';

interface AuthState {
    isAuth: boolean;
    user: IUser | null;
}

const initialState: AuthState = {
    isAuth: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
    },
});

export const auth = (state: RootState) => state.auth;

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
