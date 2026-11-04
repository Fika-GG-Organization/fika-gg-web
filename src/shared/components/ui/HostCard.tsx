import { Box, Typography } from '@mui/material';
import UserAvatar from './UserAvatar';

type HostCardProps = {
    name: string;
    avatarUrl?: string | null;
    label?: string;
};

/**
 * small box with a person and a label above the name, mostly for showing the host
 * label can be changed if u want it for something else like "Skapad av"
 *
 * @example
 * <HostCard name="Alex K" />
 * <HostCard name={host.displayName} avatarUrl={host.avatarUrl} label="Skapad av" />
 */
export default function HostCard({ name, avatarUrl, label = 'Värd' }: HostCardProps) {
    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 2,
                bgcolor: 'background.paper',
                border: `1.5px solid ${theme.palette.fika.line}`,
                borderRadius: '12px',
            })}
        >
            <UserAvatar name={name} src={avatarUrl} size={48} />
            <Box>
                <Typography
                    sx={{ fontFamily: 'monospace', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary' }}
                >
                    {label}
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>{name}</Typography>
            </Box>
        </Box>
    );
}