import { useState, type ReactNode } from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Typography,
} from '@mui/material';

type ConfirmDialogProps = {
    open: boolean;
    title: string;
    description?: ReactNode;
    confirmLabel: string;
    cancelLabel?: string;
    checkboxLabel?: string;
    onConfirm: () => void;
    onClose: () => void;
};

// the inside of the dialog, its own component so the checkbox resets every time the dialog opens
function ConfirmBody({ description, confirmLabel, cancelLabel, checkboxLabel, onConfirm, onClose }: Omit<ConfirmDialogProps, 'open' | 'title'>) {
    const [checked, setChecked] = useState(false);
    const canConfirm = !checkboxLabel || checked;

    return (
        <>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {description && (
                    <Typography component="div" sx={{ color: 'text.secondary' }}>
                        {description}
                    </Typography>
                )}
                {checkboxLabel && (
                    <FormControlLabel
                        control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
                        label={checkboxLabel}
                    />
                )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5 }}>
                <Button onClick={onClose} variant="outlined" autoFocus sx={{ color: 'text.primary' }}>
                    {cancelLabel}
                </Button>
                <Button onClick={onConfirm} variant="contained" disabled={!canConfirm}>
                    {confirmLabel}
                </Button>
            </DialogActions>
        </>
    );
}

/**
 * are u sure dialog for stuff that cant be undone
 * with checkboxLabel the confirm button stays disabled until u tick the box
 * focus starts on the cancel button so pressing enter by accident is safe
 *
 * @example
 * <ConfirmDialog
 *     open={open}
 *     title="Vill du radera ditt konto?"
 *     description="Det går inte att ångra."
 *     confirmLabel="Radera för alltid"
 *     cancelLabel="Behåll mitt konto"
 *     checkboxLabel="Jag fattar att det inte går att ångra"
 *     onConfirm={deleteAccount}
 *     onClose={() => setOpen(false)}
 * />
 */
export default function ConfirmDialog({ open, title, cancelLabel = 'Avbryt', ...rest }: ConfirmDialogProps) {
    return (
        <Dialog open={open} onClose={rest.onClose} aria-labelledby="confirm-dialog-title">
            <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
            <ConfirmBody cancelLabel={cancelLabel} {...rest} />
        </Dialog>
    );
}