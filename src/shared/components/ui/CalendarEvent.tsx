import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';

export type CalendarEventLook = 'mine' | 'open' | 'full';

export type CalendarEventProps = {
    title: string;
    timeLabel: string;
    look: CalendarEventLook;
    detail?: string;
    shortLabel?: string;
    href?: string;
    ariaLabel?: string;
    compact?: boolean;
};

// an event placed on a day, id and start are only used by WeekView/MonthView to sort it in
export type CalendarItem = CalendarEventProps & {
    id: string | number;
    start: Date | string;
};

// matches the legend: mine = solid lingon, full = dashed, open = outlined
function lookSx(look: CalendarEventLook, theme: Theme) {
    if (look === 'mine') {
        return { bgcolor: 'primary.main', color: 'primary.contrastText', border: `1.5px solid ${theme.palette.primary.main}` };
    }
    if (look === 'full') {
        return { bgcolor: theme.palette.fika.fill, color: 'text.primary', border: `1.5px dashed ${theme.palette.fika.fieldLine}` };
    }
    return { bgcolor: 'background.paper', color: 'text.primary', border: `1.5px solid ${theme.palette.fika.line}` };
}

/**
 * one event inside the calendar, u pick the look so it matches the legend
 * normal is the block in week view, compact is the one line pill in month view
 * compact shows timeLabel + shortLabel (or the title if theres no shortLabel)
 *
 * @example
 * <CalendarEvent title="Fredagsmys 5-stack" timeLabel="20:00" detail="Valorant · 4/5" look="mine" href="/events/1" />
 * <CalendarEvent title="Fredagsmys 5-stack" timeLabel="20:00" shortLabel="Valorant" look="open" compact />
 */
export default function CalendarEvent({ title, timeLabel, look, detail, shortLabel, href, ariaLabel, compact = false }: CalendarEventProps) {
    const linkProps = href ? { component: RouterLink, to: href } : {};

    return (
        <Box
            {...linkProps}
            aria-label={ariaLabel}
            sx={(theme) => ({
                ...lookSx(look, theme),
                display: 'flex',
                flexDirection: 'column',
                gap: 0.25,
                textDecoration: 'none',
                borderRadius: compact ? '6px' : '8px',
                px: compact ? 0.75 : 1.25,
                py: compact ? 0.25 : 1,
                minHeight: compact ? 0 : 44,
                overflow: 'hidden',
                '&:hover': href ? { filter: 'brightness(1.1)' } : {},
            })}
        >
            {compact ? (
                <Typography noWrap sx={{ fontSize: 12, fontWeight: 500 }}>
                    {timeLabel} {shortLabel ?? title}
                </Typography>
            ) : (
                <>
                    <Typography sx={{ fontFamily: 'monospace', fontSize: 12 }}>{timeLabel}</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{title}</Typography>
                    {detail && <Typography sx={{ fontSize: 12, opacity: 0.85 }}>{detail}</Typography>}
                </>
            )}
        </Box>
    );
}