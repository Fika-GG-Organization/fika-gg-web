import { Box, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import UserAvatar from './UserAvatar';

export type ListPlayer = {
    id: string;
    name: string;
    avatarUrl?: string | null;
    gamerTag?: string | null;
    note?: string;
};

type ParticipantListProps = {
    players: ListPlayer[];
    max: number;
    title?: string;
};

// more empty rows than this gets silly, the rest becomes one line
const maxOpenRows = 3;

const rowSx = (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    px: 2,
    py: 1.5,
    borderTop: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': { borderTop: 'none' },
});

/**
 * list of players with avatar, name and gamertag, plus empty "ledig plats" rows for whats left
 * note is the small text on the right, like "Värd", u decide what it says
 *
 * @example
 * <ParticipantList
 *     players={[{ id: '1', name: 'Alex K', note: 'Värd' }, { id: '2', name: 'Noor H', gamerTag: 'noorh#4410' }]}
 *     max={5}
 * />
 */
export default function ParticipantList({ players, max, title = 'Spelare' }: ParticipantListProps) {
    const open = Math.max(0, max - players.length);
    const openRows = Math.min(open, maxOpenRows);

    return (
        <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography component="h2" sx={{ fontSize: 22, fontWeight: 700 }}>{title}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    {players.length} / {max} med
                </Typography>
            </Box>

            <Box
                component="ul"
                sx={(theme) => ({
                    listStyle: 'none',
                    m: 0,
                    p: 0,
                    bgcolor: 'background.paper',
                    border: `1.5px solid ${theme.palette.fika.line}`,
                    borderRadius: '12px',
                    overflow: 'hidden',
                })}
            >
                {players.map((p) => (
                    <Box component="li" key={p.id} sx={rowSx}>
                        <UserAvatar name={p.name} src={p.avatarUrl} />
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                            <Typography sx={{ fontWeight: 600, lineHeight: 1.3 }}>{p.name}</Typography>
                            {p.gamerTag && (
                                <Typography sx={{ fontFamily: 'monospace', fontSize: 13, color: 'text.secondary' }}>
                                    {p.gamerTag}
                                </Typography>
                            )}
                        </Box>
                        {p.note && <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{p.note}</Typography>}
                    </Box>
                ))}

                {Array.from({ length: openRows }, (_, i) => (
                    <Box component="li" key={`open-${i}`} sx={rowSx}>
                        <Box
                            aria-hidden
                            sx={(theme) => ({
                                width: 36,
                                height: 36,
                                borderRadius: '50%',
                                border: `1.5px dashed ${theme.palette.fika.fieldLine}`,
                                boxSizing: 'border-box',
                            })}
                        />
                        <Typography sx={{ color: 'text.secondary' }}>Ledig plats</Typography>
                    </Box>
                ))}

                {open > openRows && (
                    <Box component="li" sx={rowSx}>
                        <Typography sx={{ color: 'text.secondary', pl: 0.5 }}>+ {open - openRows} till lediga platser</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}