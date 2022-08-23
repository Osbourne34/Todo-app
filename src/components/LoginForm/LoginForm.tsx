import React, { SyntheticEvent } from 'react';
import { ITokens } from '../../models/ITokens';

import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from '../../store/api/authApi/authApi';

import { useInput } from '../../hooks/input';
import { useValideForm } from '../../hooks/valideForm';
import { emailValidator, passwordValidator } from '../../utils/validate';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const LoginForm = () => {
    const navigate = useNavigate();
    const email = useInput(emailValidator);
    const password = useInput(passwordValidator);
    const isValidForm = useValideForm(email.hasError, password.hasError);

    const [login, { error }] = useLoginMutation();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await login({ email: email.value, password: password.value })
            .unwrap()
            .then((res: ITokens) => {
                localStorage.setItem('accessToken', res.access);
                localStorage.setItem('refreshToken', res.refresh);

                navigate('/', { replace: true });
            });
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
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

            <Button
                disabled={!isValidForm}
                type="submit"
                variant="contained"
                fullWidth
            >
                Войти
            </Button>
        </Box>
    );
};
