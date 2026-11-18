import { useId } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type NumberStepperProps = {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    helperText?: string;
    decreaseLabel?: string;
    increaseLabel?: string;
};

/**
 * - 5 + control for small numbers like max players
 * the page owns the value, this just shows it and calls onChange
 * the buttons turn off at min and max so u cant go outside
 *
 * @example
 * <NumberStepper
 *     label="Max antal spelare (med dig)"
 *     value={maxPlayers}
 *     onChange={setMaxPlayers}
 *     min={2}
 *     max={50}
 *     decreaseLabel="Färre spelare"
 *     increaseLabel="Fler spelare"
 * />
 */
export default function NumberStepper({
    label,
    value,
    onChange,
    min = 0,
    max = Infinity,
    helperText,
    decreaseLabel = 'Minska',
    increaseLabel = 'Öka',
}: NumberStepperProps) {
    const labelId = useId();

    return (
        <Box>
            <Typography id={labelId} sx={{ fontWeight: 600, fontSize: 14, mb: 1 }}>
                {label}
            </Typography>
            <Box
                role="group"
                aria-labelledby={labelId}
                sx={(theme) => ({
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: `1.5px solid ${theme.palette.fika.line}`,
                    borderRadius: '8px',
                })}
            >
                <IconButton aria-label={decreaseLabel} onClick={() => onChange(value - 1)} disabled={value <= min}>
                    <RemoveIcon />
                </IconButton>
                <Typography
                    component="output"
                    aria-live="polite"
                    sx={{ minWidth: 48, textAlign: 'center', fontWeight: 700, fontSize: 18 }}
                >
                    {value}
                </Typography>
                <IconButton aria-label={increaseLabel} onClick={() => onChange(value + 1)} disabled={value >= max}>
                    <AddIcon />
                </IconButton>
            </Box>
            {helperText && (
                <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 1 }}>{helperText}</Typography>
            )}
        </Box>
    );
}