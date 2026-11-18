import { Box, Chip } from '@mui/material';

type FilterOption = {
    value: string;
    label: string;
}

type FilterChipsProps = {
    label: string;
    options: FilterOption[];
    selected: string;
    onChange: (value: string) => void;
    scroll?: boolean;
}

/**
 * row of pill buttons where u pick one, like alla spel / valorant / rocket league
 * it doesnt keep track of whats picked itself, the page does that and passes selected + onChange
 * scroll makes it one line that u swipe sideways instead of wrapping, for mobile
 *
 * used in: upptäck (game filter), kalender (game filter), upptäck on mobile (scroll)
 *
 * @example
 * <FilterChips
 *     label="Filtrera på spel"
 *     options={[{ value: 'all', label: 'Alla spel' }, { value: '3498', label: 'Valorant' }]}
 *     selected={game}
 *     onChange={setGame}
 * />
 */
export default function FilterChips({ label, options, selected, onChange, scroll = false }: FilterChipsProps) {
    return (
        <Box
            role="group"
            aria-label={label}
            sx={{
                display: 'flex',
                gap: 1,
                flexWrap: scroll ? 'nowrap' : 'wrap',
                overFlowX: scroll ? 'auto' : 'visible',
                py: scroll ? 0.5 : 0,
            }}
        >
            {options.map((option) => {
                const isSelected = option.value === selected;

                return (
                    <Chip
                        key={option.value}
                        label={option.label}
                        clickable
                        onClick={() => onChange(option.value)}
                        aria-pressed={isSelected}
                        sx={(theme) => ({
                            height: scroll ? 40 : 44,
                            px: 1,
                            flexShrink: 0,
                            fontSize: 15,
                            fontWeight: 500,
                            border: `1.5px solid ${isSelected ? theme.palette.primary.main : theme.palette.fika.line}`,
                            bgcolor: isSelected ? theme.palette.fika.chipOn : 'background.paper',
                            color: 'text.primary',
                            '&:hover': {
                                bgcolor: theme.palette.fika.chipOn,
                            },
                        })}
                    />
                );
            })}
        </Box>
    )
}