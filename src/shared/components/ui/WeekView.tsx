import { Box, Typography } from '@mui/material';
import { addDays, isSameDay, startOfWeek } from '@/shared/utils/dates';
import CalendarEvent, { type CalendarItem } from './CalendarEvent';

type WeekViewProps = {
    weekStart: Date;
    items: CalendarItem[];
    today?: Date;
};

/**
 * 7 columns mån to sön with the items for each day stacked under it
 * give it any date in the week, it finds the monday itself
 * scrolls sideways on small screens instead of squishing the columns
 *
 * @example
 * <WeekView weekStart={new Date()} items={items} />
 */
export default function WeekView({ weekStart, items, today = new Date() }: WeekViewProps) {
    const days = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(weekStart), i));

    return (
        <Box sx={(theme) => ({ overflowX: 'auto', bgcolor: 'background.paper', border: `1.5px solid ${theme.palette.fika.line}`, borderRadius: '12px' })}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(130px, 1fr))', minWidth: 910 }}>
                {days.map((day, i) => {
                    const isToday = isSameDay(day, today);
                    const dayItems = items
                        .filter((item) => isSameDay(new Date(item.start), day))
                        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

                    return (
                        <Box
                            key={day.toISOString()}
                            sx={(theme) => ({
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                p: 1.25,
                                minHeight: 420,
                                borderRight: i < 6 ? `1px solid ${theme.palette.divider}` : 'none',
                                bgcolor: i >= 5 ? 'background.default' : 'transparent',
                            })}
                        >
                            <Box sx={(theme) => ({ display: 'flex', alignItems: 'baseline', gap: 0.75, pb: 1, borderBottom: `1px solid ${theme.palette.divider}` })}>
                                <Typography sx={{ fontFamily: 'monospace', fontSize: 12, textTransform: 'uppercase', color: 'text.secondary' }}>
                                    {day.toLocaleDateString('sv-SE', { weekday: 'short' })}
                                </Typography>
                                <Typography sx={{ fontSize: 18, fontWeight: 700, color: isToday ? 'primary.main' : 'text.primary' }}>
                                    {day.getDate()}
                                </Typography>
                                {isToday && <Typography sx={{ fontSize: 12, color: 'primary.main' }}>idag</Typography>}
                            </Box>

                            {dayItems.map((item) => (
                                <CalendarEvent key={item.id} {...item} />
                            ))}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}