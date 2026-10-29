import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import CapacityMeter from './CapacityMeter';

type JoinPanelProps = {
    headline: string;
    joined: number;
    max: number;
    message?: ReactNode;
    label?: string;
    children?: ReactNode;
};

/**
 * the box on the event page with how many spots are left and the join buttons
 * it doesnt decide anything, u pass the headline, the message and the buttons as children
 * buttons inside get stretched to full width automatically
 *
 * @example
 * <JoinPanel headline="1 plats kvar" joined={4} max={5} message="Du kan hoppa av när som helst innan det börjar.">
 *     <Button variant="contained" size="large" onClick={join}>Joina</Button>
 *     <Button variant="outlined" startIcon={<LinkIcon />} onClick={copyLink}>Kopiera inbjudningslänk</Button>
 * </JoinPanel>
 */
export default function JoinPanel({ headline, joined, max, message, label = 'Platser', children }: JoinPanelProps) {
    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 3,
                bgcolor: 'background.paper',
                border: `1.5px solid ${theme.palette.fika.line}`,
                borderRadius: '16px',
            })}
        >
            <Box>
                <Typography
                    sx={{ fontFamily: 'monospace', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary' }}
                >
                    {label}
                </Typography>
                <Typography sx={{ fontSize: 24, fontWeight: 700 }}>{headline}</Typography>
            </Box>

            <CapacityMeter joined={joined} max={max} size="large" />

            {message && (
                <Typography component="div" sx={{ fontSize: 14, color: 'text.secondary' }}>
                    {message}
                </Typography>
            )}

            {children && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        // every button inside gets full width so u dont have to add fullWidth each time
                        '& .MuiButton-root': { width: '100%' },
                    }}
                >
                    {children}
                </Box>
            )}
        </Box>
    );
}