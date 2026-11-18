import { Box, Button, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export type CalendarView = 'week' | 'month';

type CalendarToolbarProps = {
    label: string;
    view: CalendarView;
    onViewChange: (view: CalendarView) => void;
    onPrev: () => void;
    onNext: () => void;
    onToday: () => void;
};

/**
 * arrows to go back and forward, idag button, and the vecka/månad switch
 * doesnt know any dates itself, the page passes the label and handles the clicks
 *
 * used in: kalender (in the PageHeader actions)
 */
export default function CalendarToolbar({ label, view, onViewChange, onPrev, onNext, onToday }: CalendarToolbarProps) {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
            <Button onClick={onToday} variant="outlined" sx={{ color: 'text.primary' }}>Idag</Button>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton aria-label="Föregående" onClick={onPrev}><ChevronLeftIcon /></IconButton>
                <Typography aria-live="polite" sx={{ minWidth: 160, textAlign: 'center', fontWeight: 600 }}>{label}</Typography>
                <IconButton aria-label="Nästa" onClick={onNext}><ChevronRightIcon /></IconButton>
            </Box>
            <ToggleButtonGroup
                value={view}
                exclusive
                onChange={(_, value: CalendarView | null) => value && onViewChange(value)}
                aria-label="Kalendervy"
                size="small"
            >
                <ToggleButton value="week" sx={{ px: 2, textTransform: 'none', fontWeight: 600 }}>Vecka</ToggleButton>
                <ToggleButton value="month" sx={{ px: 2, textTransform: 'none', fontWeight: 600 }}>Månad</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}