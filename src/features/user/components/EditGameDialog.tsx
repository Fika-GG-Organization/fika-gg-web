import { useState, type SubmitEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from '@mui/material';
import { useToast } from '@/app/toast';
import { removeGameFromUserAsync, updateGamerTagAsync } from '../api/userApi';
import type { OwnedGame } from '../types/UserResponse';

type EditGameDialogProps = {
    game: OwnedGame;
    onClose: () => void;
    onSaved: () => void;
};

/**
 * dialog for changing the gamertag on a game or removing the game from ur profile.
 * render it only when a game is picked so the field starts with that games tag every time.
 * used in: UserPage
 *
 * @example
 * {editingGame && (
 *     <EditGameDialog game={editingGame} onClose={() => setEditingGame(null)} onSaved={reload} />
 * )}
 */
export default function EditGameDialog({ game, onClose, onSaved }: EditGameDialogProps) {
    const toast = useToast();
    const [gamerTag, setGamerTag] = useState(game.gamerTag ?? '');
    const [isSaving, setIsSaving] = useState(false);

    // runs save or remove, shows a toast and tells the page to refetch if it worked
    async function run(action: () => Promise<void>, successText: string) {
        setIsSaving(true);
        try {
            await action();
            toast(successText, { variant: 'success' });
            onSaved();
            onClose();
        } catch {
            toast('Något gick fel, försök igen.', { variant: 'error' });
        } finally {
            setIsSaving(false);
        }
    }

    function handleSave(e: SubmitEvent) {
        e.preventDefault();
        void run(() => updateGamerTagAsync(game.gameId, gamerTag), 'Gamertag sparad!');
    }

    function handleRemove() {
        void run(() => removeGameFromUserAsync(game.gameId), `${game.name} är borttaget.`);
    }

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="xs">
            <form onSubmit={handleSave}>
                <DialogTitle>{game.name}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Gamertag"
                        value={gamerTag}
                        onChange={(e) => setGamerTag(e.target.value)}
                        helperText="Lämna tomt för att ta bort din gamertag"
                        fullWidth
                        autoFocus
                        margin="dense"
                        disabled={isSaving}
                        slotProps={{ htmlInput: { maxLength: 50 } }}
                    />
                </DialogContent>
                <DialogActions
                  sx={{
                    justifyContent: 'space-between',
                    px: 3,
                    pb: 2,
                    gap: 1,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'stretch', sm: 'center' },
                    '& .MuiButton-root': { whiteSpace: 'nowrap' },
                  }}
                >
                    <Button color="error" onClick={handleRemove} disabled={isSaving}>
                        Ta bort spel
                    </Button>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        flexDirection: { xs: 'column-reverse', sm: 'row' }
                      }}
                    >
                        <Button onClick={onClose} disabled={isSaving}>Avbryt</Button>
                        <Button type="submit" variant="contained" disabled={isSaving}>Spara</Button>
                    </Box>
                </DialogActions>
            </form>
        </Dialog>
    );
}
