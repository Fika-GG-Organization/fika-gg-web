import { Box, Typography } from '@mui/material';
import UserAvatar from './UserAvatar';

type BackupPerson = {
    id: string;
    name: string;
    avatarUrl?: string | null;
};

type BackupListProps = {
    people: BackupPerson[];
    title?: string;
    description?: string;
};

/**
 * numbered list in a dashed box for the reserve list, first in the array is nr 1
 * draws nothing if the list is empty so u dont need an if around it
 *
 * @example
 * <BackupList people={[{ id: '1', name: 'Ida W' }, { id: '2', name: 'Ella S' }]} />
 */
export default function BackupList({
    people,
    title = 'Reservlista',
    description = 'Den som står först får platsen direkt om någon hoppar av.',
}: BackupListProps) {
    if (people.length === 0) {
        return null;
    }

    return (
        <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography component="h3" sx={{ fontSize: 18, fontWeight: 700 }}>{title}</Typography>
            {description && <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>{description}</Typography>}

            <Box
                component="ol"
                sx={(theme) => ({
                    listStyle: 'none',
                    m: 0,
                    p: 0,
                    border: `1.5px dashed ${theme.palette.fika.line}`,
                    borderRadius: '12px',
                    overflow: 'hidden',
                })}
            >
                {people.map((p, i) => (
                    <Box
                        component="li"
                        key={p.id}
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            px: 2,
                            py: 1.25,
                            borderTop: `1px solid ${theme.palette.divider}`,
                            '&:first-of-type': { borderTop: 'none' },
                        })}
                    >
                        <Typography sx={{ fontFamily: 'monospace', color: 'text.secondary', width: 20 }}>{i + 1}</Typography>
                        <UserAvatar name={p.name} src={p.avatarUrl} size={32} />
                        <Typography sx={{ fontWeight: 600 }}>{p.name}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}