import React, { SyntheticEvent, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios, { AxiosError } from 'axios';
import { API_URL } from '../../constants/api';

import { useInput } from '../../hooks/input';
import { useValideForm } from '../../hooks/valideForm';
import { emailValidator, passwordValidator } from '../../utils/validate';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { IUser } from '../../models/IUser';

export const RegisterForm = () => {
    const navigate = useNavigate();
    const email = useInput(emailValidator);
    const password = useInput(passwordValidator);
    const [password2, setPassword2] = useState<string>('');
    const [blur, setBlur] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ email: string[] } | undefined>(
        undefined,
    );

    let passwordMatch: boolean =
        Boolean(password.value) && password.value === password2;

    const isValidForm = useValideForm(
        email.hasError,
        password.hasError,
        !passwordMatch,
    );

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        axios
            .post<IUser>(API_URL + 'user/registrer/', {
                email: email.value.toLowerCase(),
                password: password.value,
                password2,
            })
            .then((res) => {
                setError(undefined);
                navigate('/login', { replace: true });
            })
            .catch((err: AxiosError<{ email: string[] }>) =>
                setError(err?.response?.data),
            )
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            {error && (
                <Alert variant="filled" severity="error" sx={{ mb: 2 }}>
                    {error.email[0]}
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
                loading={isLoading}
                type="submit"
                variant="contained"
                fullWidth
            >
                Создать аккаунт
            </LoadingButton>
        </Box>
    );
};
