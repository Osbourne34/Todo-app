import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../../constants/api';
import { IAuthResponse } from '../../../models/IAuthResponse';
import { IUser } from '../../../models/IUser';
import { RootState } from '../../store';

type AuthState = {
    isAuth: boolean;
    loading: boolean;
    loadingForBackdrop: boolean;
    error:
        | {
              status: number | undefined;
              data: any;
          }
        | undefined;
};

const initialState: AuthState = {
    isAuth: false,
    loading: false,
    loadingForBackdrop: false,
    error: undefined,
};

export const login = createAsyncThunk<
    IAuthResponse,
    { email: string; password: string },
    { rejectValue: AuthState['error'] }
>('auth/login', async (body, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL + 'user/token/', body);
        return response.data;
    } catch (err) {
        const error = err as AxiosError;
        return rejectWithValue({
            status: error.response?.status,
            data: error.response?.data,
        });
    }
});

export const register = createAsyncThunk<
    IUser,
    { email: string; password: string; password2: string },
    { rejectValue: AuthState['error'] }
>('auth/register', async (body, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL + 'user/register/', body);
        return response.data;
    } catch (err) {
        const error = err as AxiosError;
        return rejectWithValue({
            status: error.response?.status,
            data: error.response?.data,
        });
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        logout: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(login.fulfilled, (state) => {
            state.isAuth = true;
            state.error = undefined;
            state.loading = false;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(register.fulfilled, (state) => {
            state.loading = false;
            state.error = undefined;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const auth = (state: RootState) => state.auth;

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
