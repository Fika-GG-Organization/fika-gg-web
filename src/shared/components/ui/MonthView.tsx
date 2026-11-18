import { Box, Typography } from '@mui/material';
import { isSameDay, monthGrid } from '@/shared/utils/dates';
import CalendarEvent, { type CalendarItem } from './CalendarEvent';

type MonthViewProps = {
    month: Date;
    items: CalendarItem[];
    today?: Date;
    maxPerDay?: number;
};

const weekdays = ['mån', 'tis', 'ons', 'tor', 'fre', 'lör', 'sön'];

/**
 * 6 week grid for one month, days outside the month are faded
 * items always show compact, more than maxPerDay becomes "+N till"
 *
 * @example
 * <MonthView month={new Date()} items={items} />
 */
export default function MonthView({ month, items, today = new Date(), maxPerDay = 3 }: MonthViewProps) {
    const days = monthGrid(month);

    return (
        <Box sx={(theme) => ({ overflowX: 'auto', bgcolor: 'background.paper', border: `1.5px solid ${theme.palette.fika.line}`, borderRadius: '12px' })}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(110px, 1fr))', minWidth: 770 }}>
                {weekdays.map((w) => (
                    <Typography
                        key={w}
                        sx={(theme) => ({
                            px: 1.5,
                            py: 1,
                            fontFamily: 'monospace',
                            fontSize: 12,
                            textTransform: 'uppercase',
                            color: 'text.secondary',
                            borderBottom: `1.5px solid ${theme.palette.fika.line}`,
                        })}
                    >
                        {w}
                    </Typography>
                ))}

                {days.map((day, i) => {
                    const inMonth = day.getMonth() === month.getMonth();
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
                                gap: 0.5,
                                p: 1,
                                minHeight: 104,
                                minWidth: 0,
                                borderBottom: `1px solid ${theme.palette.divider}`,
                                borderRight: i % 7 < 6 ? `1px solid ${theme.palette.divider}` : 'none',
                                bgcolor: i % 7 >= 5 ? 'background.default' : 'transparent',
                            })}
                        >
                            <Typography
                                sx={{
                                    alignSelf: 'flex-start',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    px: isToday ? 0.75 : 0,
                                    borderRadius: 999,
                                    bgcolor: isToday ? 'primary.main' : 'transparent',
                                    color: isToday ? 'primary.contrastText' : 'text.primary',
                                    opacity: inMonth ? 1 : 0.4,
                                }}
                            >
                                {day.getDate()}
                            </Typography>

                            {dayItems.slice(0, maxPerDay).map((item) => (
                                <CalendarEvent key={item.id} {...item} compact />
                            ))}
                            {dayItems.length > maxPerDay && (
                                <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>+{dayItems.length - maxPerDay} till</Typography>
                            )}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}