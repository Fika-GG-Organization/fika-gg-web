import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import GameBanner from './GameBanner';
import CapacityMeter from './CapacityMeter';
import StatusPill, { type EventStatus } from './StatusPill';
import UserAvatar from './UserAvatar';

type EventCardProps = {
    title: string;
    gameName: string;
    coverUrl?: string | null;
    timeLabel: string;
    hostName: string;
    hostAvatarUrl?: string | null;
    joined: number;
    max: number;
    status: EventStatus;
    statusLabel: string;
    href?: string;
};

/**
 * card for one event, used in grids like upptäck
 * it just shows what u give it, u decide the status and format the time before passing it in
 * with href the whole card is a link, without it its just a card (good for previews)
 *
 * @example
 * <EventCard
 *     title="Fredagsmys 5-stack"
 *     gameName="Valorant"
 *     timeLabel={formatEventTime(event.startTime, event.endTime)}
 *     hostName="Alex K"
 *     joined={3}
 *     max={5}
 *     status="open"
 *     statusLabel="2 platser kvar"
 *     href="/events/1"
 * />
 */
export default function EventCard({
    title,
    gameName,
    coverUrl,
    timeLabel,
    hostName,
    hostAvatarUrl,
    joined,
    max,
    status,
    statusLabel,
    href,
}: EventCardProps) {
    const content = (
        <>
            <GameBanner name={gameName} coverUrl={coverUrl} />

            <Box sx={{ p: 2.25, display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
                <Typography
                    sx={{ fontFamily: 'monospace', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary' }}
                >
                    {gameName}
                </Typography>

                <Typography component="h3" sx={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3 }}>
                    {title}
                </Typography>

                <Typography sx={{ fontSize: 15, color: 'text.secondary' }}>{timeLabel}</Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: 14 }}>
                    <UserAvatar name={hostName} src={hostAvatarUrl} size={28} />
                    Värd: {hostName}
                </Box>

                {/* pushes the bottom part down so cards in a row line up */}
                <Box sx={{ flexGrow: 1 }} />

                <CapacityMeter joined={joined} max={max} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: 14 }}>
                        {joined} / {max} med
                    </Typography>
                    <StatusPill status={status} label={statusLabel} />
                </Box>
            </Box>
        </>
    );

    const layoutSx = { height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' };

    return (
        <Card sx={{ height: '100%' }}>
            {href ? (
                <CardActionArea component={RouterLink} to={href} sx={layoutSx}>
                    {content}
                </CardActionArea>
            ) : (
                <Box sx={layoutSx}>{content}</Box>
            )}
        </Card>
    );
}