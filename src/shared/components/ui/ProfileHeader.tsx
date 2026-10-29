import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import UserAvatar from './UserAvatar';

type ProfileStat = {
    label: string;
    value: number | string;
};

type ProfileHeaderProps = {
    name: string;
    avatarUrl?: string | null;
    subtitle?: string;
    stats?: ProfileStat[];
    action?: ReactNode;
};

/**
 * top of a profile with a big avatar, name, a small line under it and some numbers
 * action is whatever goes on the right, like a redigera profil button
 *
 * @example
 * <ProfileHeader
 *     name="Alex K"
 *     subtitle="Medlem sedan sep 2026"
 *     stats={[{ label: 'event', value: 12 }, { label: 'som värd', value: 4 }]}
 *     action={<Button variant="outlined">Redigera profil</Button>}
 * />
 */
export default function ProfileHeader({ name, avatarUrl, subtitle, stats = [], action }: ProfileHeaderProps) {
    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 3,
                p: 3,
                bgcolor: 'background.paper',
                border: `1.5px solid ${theme.palette.fika.line}`,
                borderRadius: '16px',
            })}
        >
            <UserAvatar name={name} src={avatarUrl} size={96} />

            <Box sx={{ flex: '1 1 240px', minWidth: 0 }}>
                <Typography variant="h1" sx={{ fontSize: 32, letterSpacing: '-0.01em' }}>{name}</Typography>
                {subtitle && <Typography sx={{ color: 'text.secondary' }}>{subtitle}</Typography>}
                {stats.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px 20px', mt: 1, fontSize: 15 }}>
                        {stats.map((s) => (
                            <span key={s.label}>
                                <strong>{s.value}</strong> {s.label}
                            </span>
                        ))}
                    </Box>
                )}
            </Box>

            {action}
        </Box>
    );
}