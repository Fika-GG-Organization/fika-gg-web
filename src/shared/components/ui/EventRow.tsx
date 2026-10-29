import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';
import DateTile from './DateTile';
import StatusPill, { type EventStatus } from './StatusPill';

type EventRowProps = {
    date: Date | string;
    title: string;
    subtitle: string;
    href?: string;
    status?: EventStatus;
    statusLabel?: string;
    action?: ReactNode;
};

/**
 * one event as a row with the date box on the left, for lists instead of big cards
 * subtitle is one line of info, u build it urself like "Valorant · 20:00 · 3/5"
 * the pill only shows if u pass both status and statusLabel, action is a button on the right
 *
 * @example
 * <EventRow
 *     date="2026-10-30T20:00:00"
 *     title="Fredagsmys 5-stack"
 *     subtitle="Valorant · 20:00–23:00 · 3/5"
 *     href="/events/1"
 *     status="joined"
 *     statusLabel="Med"
 *     action={<Button variant="outlined">Hoppa av</Button>}
 * />
 */
export default function EventRow({ date, title, subtitle, href, status, statusLabel, action }: EventRowProps) {
    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 2,
                p: 2,
                bgcolor: 'background.paper',
                border: `1.5px solid ${theme.palette.fika.line}`,
                borderRadius: '12px',
            })}
        >
            <DateTile date={date} />

            <Box sx={{ flex: '1 1 220px', minWidth: 0 }}>
                {href ? (
                    <Link
                        component={RouterLink}
                        to={href}
                        underline="hover"
                        sx={{ display: 'block', fontWeight: 600, fontSize: 17, color: 'text.primary' }}
                    >
                        {title}
                    </Link>
                ) : (
                    <Typography sx={{ fontWeight: 600, fontSize: 17 }}>{title}</Typography>
                )}
                <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>{subtitle}</Typography>
            </Box>

            {status && statusLabel && <StatusPill status={status} label={statusLabel} />}
            {action}
        </Box>
    );
}