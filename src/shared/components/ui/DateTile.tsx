import { Box, Typography } from "@mui/material";

type DateTileProps = {
    date: Date | string;
    size?: 'small' | 'medium';
};

/**
 * small box with month on top and day under, like okt / 16
 * takes a Date or the iso string straight from the api so u dont have to convert it first
 *
 * used in: event rows (profil, mina event), next up on mobile profil (small)
 *
 * @example
 * <DateTile date="2026-10-16T20:00:00Z" />
 * <DateTile date={event.startTime} size="small" />
 */
export default function DateTile({ date, size = 'medium' }: DateTileProps) {
    const d = typeof date === 'string' ? new Date(date) : date;
    const month = d.toLocaleDateString('sv-SE', { month: 'short' }).replace('.', '');
    const isSmall = size === 'small';

    return (
        <Box
            component="time"
            dateTime={d.toISOString()}
            sx={(theme) => ({
                width: isSmall ? 48 : 56,
                flexShrink: 0,
                py: 0.75,
                border: `1.5px solid ${theme.palette.fika.line}`,
                borderRadius: '8px',
                textAlign: 'center',
                lineHeight: 1.2,
            })}
        >
            <Typography
                component="span"
                sx={{ display: 'block', fontFamily: 'monospace', fontSize: 11, textTransform: 'upperCase', color: 'text.secondary' }}
            >
                {month}
            </Typography>
            <Typography component="span" sx={{ display: 'block', fontWeight: 700, fontSize: isSmall ? 18 : 20}}>
                {d.getDate()}
            </Typography>
        </Box>
    )
}