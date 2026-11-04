import { Avatar, Box } from '@mui/material';
import { initials } from '@/shared/utils/initials';

type Player = {
    id: string;
    displayName: string;
    avatarUrl?: string | null;
};

type AvatarStackProps = {
    players: Player[];
    max: number;
    size?: 'small' | 'medium' | 'large';
    maxVisible?: number;
};

const sizes = { small: 28, medium: 36, large: 52 };

/**
 * row of player avatars + empty dashed spots for whats left, like a lobby.
 * only shows maxVisible circles and puts the rest in a +N so a 50 player event doesnt explode.
 * screen readers get one label with all the names instead of reading every circle.
 *
 * used in: event page on mobile (large), event card compact (small).
 *
 * @example
 * <AvatarStack players={event.participants} max={event.maxPlayers} />
 * <AvatarStack players={players} max={10} size="large" maxVisible={5} />
 */
export default function AvatarStack({ players, max, size = 'medium', maxVisible = 5}: AvatarStackProps) {
    const px = sizes[size];
    const shown = players.slice(0, maxVisible);
    const openSlots = Math.max(0, max - players.length);
    const openShown = Math.min(openSlots, maxVisible - shown.length);
    const hidden = players.length - shown.length + openSlots - openShown;

    const names = players.map((p) => p.displayName).join(', ');
    const label = `${players.length} av ${max} med${names ? `: ${names}` : ''}`;

    const circle = {
        width: px,
        height: px,
        fontSize: px * 0.34,
        fontWeight: 700,
    };

    return (
        <Box role="img" aria-label={label} sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {shown.map((p) => (
                <Avatar
                    key={p.id}
                    src={p.avatarUrl ?? undefined}
                    aria-hidden
                    sx={(theme) => ({
                        ...circle,
                        bgcolor: theme.palette.fika.fill,
                        color: 'text.primary',
                        border: `1.5px solid ${theme.palette.fika.line}`,
                    })}
                >
                    {initials(p.displayName)}
                </Avatar>
            ))}

            {Array.from({ length: openShown }, (_, i) => (
                <Box
                    key={`open-${i}`}
                    aria-hidden
                    sx={(theme) => ({
                        ...circle,
                        borderRadius: '50%',
                        border: `1.5px dashed ${theme.palette.fika.fieldLine}`,
                        color: 'text.secondary',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
                    })}
                >
                    {size === 'large' ? 'Ledig' : '+'}
                </Box>
            ))}

            {hidden > 0 && (
                <Box
                    aria-hidden
                    sx={(theme) => ({
                        ...circle,
                        borderRadius: '50%',
                        bgcolor: theme.palette.fika.fill,
                        color: 'text.secondary',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    })}
                >
                    +{hidden}
                </Box>
            )}
        </Box>
    );
}