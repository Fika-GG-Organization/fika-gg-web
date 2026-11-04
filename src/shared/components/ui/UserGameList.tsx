import { Box, Button, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import GameBanner from './GameBanner';

type ListGame = {
    id: string | number;
    name: string;
    coverUrl?: string | null;
    gamerTag?: string | null;
};

type UserGameListProps = {
    games: ListGame[];
    title?: string;
    emptyText?: string;
    onAdd?: () => void;
    onEdit?: (id: string | number) => void;
};

/**
 * list of games with the gamertag under each one
 * the add button and the edit pens only show if u pass onAdd / onEdit, so it can be read only too
 *
 * @example
 * <UserGameList
 *     games={[{ id: 1, name: 'Valorant', gamerTag: 'alexk#EUW' }]}
 *     onAdd={openAddDialog}
 *     onEdit={(id) => editGamerTag(id)}
 * />
 */
export default function UserGameList({ games, title = 'Mina spel', emptyText = 'Inga spel än.', onAdd, onEdit }: UserGameListProps) {
    return (
        <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, minHeight: 44 }}>
                <Typography component="h2" sx={{ fontSize: 22, fontWeight: 700 }}>{title}</Typography>
                {onAdd && (
                    <Button
                        onClick={onAdd}
                        startIcon={<AddIcon />}
                        variant="outlined"
                        sx={(theme) => ({ color: 'text.primary', borderColor: theme.palette.fika.line })}
                    >
                        Lägg till spel
                    </Button>
                )}
            </Box>

            {games.length === 0 ? (
                <Typography sx={{ color: 'text.secondary' }}>{emptyText}</Typography>
            ) : (
                <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {games.map((g) => (
                        <Box
                            component="li"
                            key={g.id}
                            sx={(theme) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: 1.5,
                                bgcolor: 'background.paper',
                                border: `1.5px solid ${theme.palette.fika.line}`,
                                borderRadius: '12px',
                            })}
                        >
                            <GameBanner name={g.name} coverUrl={g.coverUrl} variant="thumb" />
                            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                <Typography sx={{ fontWeight: 600 }}>{g.name}</Typography>
                                <Typography sx={{ fontFamily: 'monospace', fontSize: 13, color: 'text.secondary' }}>
                                    {g.gamerTag ?? 'Ingen gamertag'}
                                </Typography>
                            </Box>
                            {onEdit && (
                                <IconButton aria-label={`Ändra gamertag för ${g.name}`} onClick={() => onEdit(g.id)}>
                                    <EditIcon />
                                </IconButton>
                            )}
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}