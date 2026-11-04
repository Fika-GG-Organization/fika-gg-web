import { Box, Typography } from '@mui/material';

/**
 * explains the 3 looks of calendar events so its not just colors
 *
 * used in: kalender, under the grid
 */
export default function CalendarLegend() {
    const items = [
        { label: 'Du är med', sx: { bgcolor: 'primary.main' } },
        { label: 'Lediga platser', sx: { bgcolor: 'background.paper', border: '1.5px solid', borderColor: 'divider' } },
        { label: 'Fullt', sx: { bgcolor: 'background.default', border: '1.5px dashed', borderColor: 'text.secondary' } },
    ];

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, mt: 2 }}>
            {items.map((item) => (
                <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 14, height: 14, borderRadius: '4px', boxSizing: 'border-box', ...item.sx }} />
                    <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>{item.label}</Typography>
                </Box>
            ))}
        </Box>
    );
}