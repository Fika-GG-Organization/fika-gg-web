import { Box, ButtonBase, Typography } from '@mui/material';
import GameBanner from './GameBanner';

type PickerGame = {
    id: string | number;
    name: string;
    coverUrl?: string | null;
    subtitle?: string;
};

type GamePickerListProps = {
    label: string;
    games: PickerGame[];
    selectedId?: string | number | null;
    onSelect: (id: string | number) => void;
    variant?: 'list' | 'tiles';
    emptyText?: string;
};

/**
 * shows games u can pick one from, the selected one gets the lingon border
 * it only shows the games u give it, the searching happens somewhere else (like GameSearch)
 * list is rows with cover, name and subtitle (like the year), tiles is a grid of covers
 *
 * @example
 * <GamePickerList
 *     label="Sökresultat"
 *     games={[{ id: 3272, name: 'Rocket League', subtitle: '2015' }]}
 *     selectedId={selected}
 *     onSelect={setSelected}
 * />
 */
export default function GamePickerList({ label, games, selectedId, onSelect, variant = 'list', emptyText = 'Inga spel hittades.' }: GamePickerListProps) {
    if (games.length === 0) {
        return <Typography sx={{ color: 'text.secondary' }}>{emptyText}</Typography>;
    }

    const isTiles = variant === 'tiles';

    return (
        <Box
            role="group"
            aria-label={label}
            sx={(theme) =>
                isTiles
                    ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 1.5 }
                    : { display: 'flex', flexDirection: 'column', border: `1.5px solid ${theme.palette.fika.line}`, borderRadius: '12px', overflow: 'hidden' }
            }
        >
            {games.map((g) => {
                const isSelected = g.id === selectedId;

                return (
                    <ButtonBase
                        key={g.id}
                        onClick={() => onSelect(g.id)}
                        aria-pressed={isSelected}
                        sx={(theme) => ({
                            display: 'flex',
                            flexDirection: isTiles ? 'column' : 'row',
                            alignItems: isTiles ? 'stretch' : 'center',
                            justifyContent: 'flex-start',
                            gap: isTiles ? 0 : 1.5,
                            p: isTiles ? 0 : 1,
                            textAlign: 'left',
                            bgcolor: isSelected ? theme.palette.fika.chipOn : 'background.paper',
                            color: 'text.primary',
                            // the inset shadow makes the selected border thicker without moving anything
                            boxShadow: isSelected ? `inset 0 0 0 2px ${theme.palette.primary.main}` : 'none',
                            ...(isTiles
                                ? { border: `1.5px solid ${theme.palette.fika.line}`, borderRadius: '10px', overflow: 'hidden' }
                                : { borderTop: `1px solid ${theme.palette.divider}`, '&:first-of-type': { borderTop: 'none' } }),
                            '&:hover': { bgcolor: theme.palette.fika.chipOn },
                        })}
                    >
                        {isTiles ? (
                            <>
                                <Box sx={{ height: 84, width: '100%' }}>
                                    <GameBanner name={g.name} coverUrl={g.coverUrl} variant="thumb" fill />
                                </Box>
                                <Typography sx={{ p: 1.25, fontWeight: 600, fontSize: 14 }}>{g.name}</Typography>
                            </>
                        ) : (
                            <>
                                <GameBanner name={g.name} coverUrl={g.coverUrl} variant="thumb" />
                                <Typography sx={{ flexGrow: 1, fontWeight: isSelected ? 700 : 500 }}>{g.name}</Typography>
                                {g.subtitle && (
                                    <Typography sx={{ fontFamily: 'monospace', fontSize: 12, color: 'text.secondary', pr: 1 }}>
                                        {g.subtitle}
                                    </Typography>
                                )}
                            </>
                        )}
                    </ButtonBase>
                );
            })}
        </Box>
    );
}