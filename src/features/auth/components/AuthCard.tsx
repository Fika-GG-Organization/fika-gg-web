import type { ReactNode } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

type AuthCardProps = {
    title: string;
    description?: string;
    children: ReactNode;
    footer?: ReactNode;
};

/**
 * the card around login and register so they look the same
 * children is the form, footer is the small line at the bottom like "ny här? skapa ett konto"
 *
 * used in: LoginForm, RegisterForm
 *
 * @example
 * <AuthCard title="Välkommen tillbaka" description="Logga in för att se dina event.">
 *     <form>...</form>
 * </AuthCard>
 */
export default function AuthCard({ title, description, children, footer }: AuthCardProps) {
    return (
        <Card sx={{ borderRadius: '16px' }}>
            <CardContent sx={{ p: { xs: 3, sm: 4.5 }, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box>
                    <Typography variant="h1" sx={{ fontSize: 30, letterSpacing: '-0.01em' }}>
                        {title}
                    </Typography>
                    {description && (
                        <Typography sx={{ color: 'text.secondary', mt: 0.75 }}>{description}</Typography>
                    )}
                </Box>

                {children}

                {footer && (
                    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                        {footer}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}