import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

type DangerZoneProps = {
    title: string;
    description?: string;
    children?: ReactNode;
};

/**
 * dashed lingon box for stuff that cant be undone, like deleting ur account
 * put the button that opens the confirm dialog as children
 *
 * @example
 * <DangerZone title="Radera konto" description="Allt raderas för alltid.">
 *     <Button variant="outlined" onClick={() => setOpen(true)}>Radera mitt konto</Button>
 * </DangerZone>
 */
export default function DangerZone({ title, description, children }: DangerZoneProps) {
    return (
        <Box
            component="section"
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1.5,
                p: 3,
                border: `1.5px dashed ${theme.palette.primary.main}`,
                borderRadius: '12px',
            })}
        >
            <Typography component="h2" sx={{ fontSize: 20, fontWeight: 700, color: 'primary.main' }}>{title}</Typography>
            {description && <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>}
            {children}
        </Box>
    );
}