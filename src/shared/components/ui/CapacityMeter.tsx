import { LinearProgress } from "@mui/material";

type CapacityMeterProps = {
    joined: number;
    max: number;
    size?: 'small' | 'large';
};

/**
 * bar that shows how full an event is.
 * dont use it alone, always put the text next to it too like "4 / 5 med"
 * caps at 100% so it cant overflow if the data is weird
 *
 * used in: event cards on upptäck (small), join panel on the event page (large)
 *
 * @example
 * <CapacityMeter joined={3} max={5} />
 * <CapacityMeter joined={4} max={5} size="large" />
 */
export default function CapacityMeter({ joined, max, size = 'small' }: CapacityMeterProps) {
    const percent = max > 0 ? Math.min(100, Math.round((joined / max) * 100)) : 0;

    return (
        <LinearProgress
            variant="determinate"
            value={percent}
            aria-label={`${joined} av ${max} platser tagna`}
            sx={(theme) => ({
                height: size === 'large' ? 10 : 8,
                borderRadius: 999,
                border: `1.5px solid ${theme.palette.fika.line}`,
                bgcolor: 'transparent',
                '& .MuiLinearProgress-bar': {
                    bgColor: 'primary.main',
                    borderRadius: 999,
                }
            })}
        />
    );
}