import { useState, type SubmitEvent } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Alert, Button, Link, Stack, TextField } from '@mui/material';
import { useAuth } from '@/app/auth/useAuth';
import { loginUser } from '../api/authApi';
import AuthCard from './AuthCard';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const data = await loginUser({ email, password });
            login(data.accessToken);
            // email is just to show ur logged in on the temp page, remove later
            navigate('/temp', { state: { email } });
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                setError('Fel e-post eller lösenord. Testa igen.');
            } else {
                setError('Något gick fel. Testa igen om en stund.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthCard
            title="Logga in"
            footer={
                <>
                    Ny här?{' '}
                    <Link component={RouterLink} to="/register" sx={{ fontWeight: 600 }}>
                        Skapa ett konto
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    {/* error goes on top so u actually see it */}
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
                        autoComplete="current-password"
                        fullWidth
                        required
                        disabled={isLoading}
                    />
                    <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading}>
                        {isLoading ? 'Loggar in...' : 'Logga in'}
                    </Button>
                </Stack>
            </form>
        </AuthCard>
    );
};