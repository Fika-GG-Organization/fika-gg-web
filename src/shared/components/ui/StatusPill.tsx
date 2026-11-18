import { Chip } from '@mui/material';

export type EventStatus = 'open' | 'full' | 'joined' | 'backup' | 'host';

type StatusPillProps = {
    status: EventStatus;
    label: string;
};

/**
 * little pill that shows the event status
 * status decides how it looks, label is just the text so we can write whatever
 * full gets a dashed border so its not only the color saying its full
 *
 * used in: event cards (upptäck, startsidan), event rows (profil, mina event)
 *
 * @example
 * <StatusPill status="open" label="2 platser kvar" />
 * <StatusPill status="full" label="Fullt · bli reserv" />
 * <StatusPill status="backup" label="Reserv nr 1" />
 */
export default function StatusPill({ status, label }: StatusPillProps) {
    return (
        <Chip
            label={label}
            size="small"
            variant="outlined"
            sx={(theme) => {
            // ur own status (med, värd, reserv) gets the tinted fill + lingon border, same trick as the selected filter chips
            const isMine = status === 'joined' || status === 'host' || status === 'backup';

            return {
                height: 28,
                fontSize: 13,
                fontWeight: 600,
                borderWidth: 1.5,
                borderStyle: status === 'full' ? 'dashed' : 'solid',
                borderColor: isMine ? theme.palette.primary.main : theme.palette.fika.fieldLine,
                bgcolor: isMine ? theme.palette.fika.chipOn : status === 'full' ? theme.palette.fika.fill : 'transparent',
                color: 'text.primary',
                '& .MuiChip-label': { px: 1.25 },
            };
        }}
        />
    );
}