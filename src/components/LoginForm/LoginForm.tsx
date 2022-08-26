import React, { SyntheticEvent, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { auth, login } from '../../store/reducers/authSlice/authSlice';

import { useInput } from '../../hooks/input';
import { formValidation } from '../../utils/valideForm';
import { emailValidator, passwordValidator } from '../../utils/validate';

import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const { error, loading } = useAppSelector(auth);

    const navigate = useNavigate();

    const email = useInput(emailValidator);
    const password = useInput(passwordValidator);
    const isValidForm = useMemo(() => {
        return formValidation(email.hasError, password.hasError);
    }, [email.hasError, password.hasError]);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        dispatch(login({ email: email.value, password: password.value }))
            .unwrap()
            .then((res) => {
                localStorage.setItem('accessToken', res.access);
                localStorage.setItem('refreshToken', res.refresh);
                navigate('/', { replace: true });
            });
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            {error && (
                <Alert variant="filled" severity="error" sx={{ mb: 2 }}>
                    {error.data?.detail || 'Ошибка сети'}
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
                loading={loading}
                type="submit"
                variant="contained"
                fullWidth
            >
                Войти
            </LoadingButton>
        </Box>
    );
};
