import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type EmptyStateProps = {
    title: string;
    description?: string;
    action?: { label: string; to: string };
};

export default function EmptyState({ title, description, action }: EmptyStateProps) {
    return (
        <Box
            sx={(theme) => ({
                border: `1.5px dashes ${theme.palette.fika.fieldLine}`,
                borderRadius: '12px',
                px: 3,
                py: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
                textAlign: 'center'
            })}
        >
            <Typography sx={{ fontWeight: 600, fontSize: 18 }}>{title}</Typography>

            {description && (
                <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
            )}

            {action && (
                <Button component={RouterLink} to={action.to} variant="contained" sx={{ mt: 1 }}>
                    {action.label}
                </Button>
            )}
        </Box>
    )
}