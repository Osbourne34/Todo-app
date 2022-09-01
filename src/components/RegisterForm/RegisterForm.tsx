import React, { SyntheticEvent, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { auth, register } from '../../store/reducers/authSlice/authSlice';

import { useInput } from '../../hooks/input';
import { formValidation } from '../../utils/valideForm';
import { emailValidator, passwordValidator } from '../../utils/validate';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

export const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const { error, loading } = useAppSelector(auth);

    const navigate = useNavigate();

    const email = useInput(emailValidator);
    const password = useInput(passwordValidator);
    const [password2, setPassword2] = useState<string>('');
    const [blur, setBlur] = useState<boolean>(false);
    let passwordMatch: boolean =
        Boolean(password.value) && password.value === password2;

    const isValidForm = useMemo(() => {
        return formValidation(
            email.hasError,
            password.hasError,
            !passwordMatch,
        );
    }, [email.hasError, password.hasError, passwordMatch]);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        dispatch(
            register({
                email: email.value.toLowerCase(),
                password: password.value,
                password2,
            }),
        )
            .unwrap()
            .then((res) => {
                navigate('/login', { replace: true });
            });
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            {error && (
                <Alert variant="filled" severity="error" sx={{ mb: 2 }}>
                    {error.data?.email[0] || 'Ошибка сети'}
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

            <TextField
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                onBlur={() => setBlur(true)}
                error={!passwordMatch && blur}
                helperText={!passwordMatch && blur && 'Пароли не совпадают'}
                label="Повтор пароля"
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
                Создать аккаунт
            </LoadingButton>
        </Box>
    );
};
