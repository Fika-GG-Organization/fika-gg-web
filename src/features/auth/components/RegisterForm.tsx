import { useState, type SubmitEvent } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Alert, Button, Link, Stack, TextField } from '@mui/material';
import { useAuth } from '@/app/auth/useAuth';
import { registerUser, loginUser } from '../api/authApi';
import { registerErrorMessage } from '../authErrors';
import AuthCard from './AuthCard';

export const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        setError('');

        // check this before bothering the api
        if (password !== confirmPassword) {
            setError('Lösenorden matchar inte.');
            return;
        }

        setIsLoading(true);

        try {
            await registerUser({ email, password });

            // log in straight away so u dont have to type it all again
            const loginData = await loginUser({ email, password });
            login(loginData.accessToken);
            navigate('/temp', { state: { email } });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(registerErrorMessage(err.response?.data));
            } else {
                setError('Något gick fel. Testa igen om en stund.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthCard
            title="Skapa ditt konto"
            footer={
                <>
                    Har du redan ett konto?{' '}
                    <Link component={RouterLink} to="/login" sx={{ fontWeight: 600 }}>
                        Logga in
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField
                        label="E-post"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        fullWidth
                        required
                        disabled={isLoading}
                    />
                    <TextField
                        label="Lösenord"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        helperText="Minst 6 tecken, med stor och liten bokstav, en siffra och ett specialtecken."
                        fullWidth
                        required
                        disabled={isLoading}
                    />
                    <TextField
                        label="Skriv lösenordet igen"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        fullWidth
                        required
                        disabled={isLoading}
                    />
                    <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading}>
                        {isLoading ? 'Skapar konto...' : 'Skapa konto'}
                    </Button>
                </Stack>
            </form>
        </AuthCard>
    );
};