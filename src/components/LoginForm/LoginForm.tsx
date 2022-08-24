import React, { SyntheticEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { useLoginMutation } from '../../store/api/authApi/authApi';
import { setAuth } from '../../store/reducers/authSlice/authSlice';

import { useInput } from '../../hooks/input';
import { useValideForm } from '../../hooks/valideForm';
import { emailValidator, passwordValidator } from '../../utils/validate';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const email = useInput(emailValidator);
    const password = useInput(passwordValidator);
    const isValidForm = useValideForm(email.hasError, password.hasError);

    const [login, { error, isLoading }] = useLoginMutation();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await login({ email: email.value, password: password.value })
            .unwrap()
            .then((res) => {
                localStorage.setItem('accessToken', res.access);
                localStorage.setItem('refreshToken', res.refresh);
                dispatch(setAuth(true));
                navigate('/', { replace: true });
            });
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            {error && (
                <Alert variant="filled" severity="error" sx={{ mb: 2 }}>
                    {error && 'status' in error && error.data.detail}
                </Alert>
            )}

            <TextField
                value={email.value}
                onChange={email.onChange}
                onBlur={email.onBlur}
                error={email.displayedError}
                helperText={email.displayedError && 'Невалидный Email'}
                label="Email"
                type="email"
                required
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                value={password.value}
                onChange={password.onChange}
                onBlur={password.onBlur}
                error={password.displayedError}
                helperText={
                    password.displayedError &&
                    'Пароль должен содержать минимум 8 и максимум 24 символа'
                }
                label="Пароль"
                type="password"
                required
                fullWidth
                sx={{ mb: 2 }}
            />

            <LoadingButton
                disabled={!isValidForm}
                loading={isLoading}
                type="submit"
                variant="contained"
                fullWidth
            >
                Войти
            </LoadingButton>
        </Box>
    );
};
