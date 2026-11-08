import { useEffect, useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { formatEventTime } from '@/shared/utils/formatEventTime';
import { searchGames } from '@/features/game/api/gameApi';
import type { GameSearchResult } from '@/features/game/game.types';
import PageHeader from '@/shared/components/ui/PageHeader';
import FormSection from '@/shared/components/ui/FormSection';
import NumberStepper from '@/shared/components/ui/NumberStepper';
import GamePickerList from '@/shared/components/ui/GamePickerList';
import EventCard from '@/shared/components/ui/EventCard';

export default function CreateEventPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<GameSearchResult[]>([]);
    const [game, setGame] = useState<GameSearchResult | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(5);
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const canSearch = search.trim().length >= 2;

    useEffect(() => {
        if (search.trim().length < 2) {
            return ;
        }

        let ignore = false;

        const timer = setTimeout(async () => {
            try {
                const games = await searchGames(search);
                if (!ignore) {
                    setResults(games);
                }
            } catch {
                if (!ignore) {
                    setResults([]);
                }
            }
        }, 300);

        return () => {
            ignore = true;
            clearTimeout(timer);
        };
    }, [search]);

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        setError('');

        const now = new Date();
        const start = new Date(startTime);
        const end = new Date(endTime);

        if (!game) {
            setError('Välj ett spel.');
            return;
        }
        if (!title.trim()) {
            setError('Skriv ett namn på eventet.');
            return;
        }
        if (start <= now) {
            setError('Eventet måste starta i framtiden.');
            return;
        }
        if (end <= start) {
            setError('Sluttiden måste vara efter starttiden.');
            return;
        }

        setIsSaving(true);
        try {
            // to do: send the event to the api when createEvent exists
            // await createEvent({
            //     title: title.trim(),
            //     description: description.trim() || null,
            //     startTime: start.toISOString(),
            //     endTime: end.toISOString(),
            //     maxPlayers,
            //     createdAt: now.toISOString(),
            //     eventGame: { rawgId: game.rawgId, name: game.name, coverUrl: game.coverUrl },
            // });

            // to do: go to the event page after publishing when it exists
            // navigate('/');
        } catch {
            setError('Kunde inte skapa eventet. Försök igen.');
        } finally {
            setIsSaving(false);
        }
    };

    const spotsLeft = maxPlayers - 1;
    return (
        <Box>
            <PageHeader title="Skapa ett event" description="Välj spel, tid och hur många ni ska vara." />

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 300px' },
                    gap: 4,
                    alignItems: 'start',
                }}
            >
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <FormSection title="1. Spel">
                        <TextField label="Sök spel" value={search} onChange={(e) => setSearch(e.target.value)} />
                        {canSearch && (
                            <GamePickerList
                                label="Välj spel"
                                variant="tiles"
                                games={results.map((g) => ({ id: g.rawgId, name: g.name, coverUrl: g.coverUrl }))}
                                selectedId={game?.rawgId}
                                onSelect={(id) => setGame(results.find((g) => g.rawgId === id) ?? null)}
                            />
                        )}
                        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                            Spelen hämtas från RAWG, en stor speldatabas.
                        </Typography>
                    </FormSection>

                    <FormSection title="2. Info">
                        <TextField
                            label="Namn på eventet"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            slotProps={{ htmlInput: { maxLength: 100 } }}
                        />
                        <TextField
                            label="Beskrivning (valfritt)"
                            placeholder="Regler, rank, voice chat – allt folk behöver veta"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            minRows={4}
                            helperText={`${description.length} / 1000`}
                            slotProps={{
                                htmlInput: { maxLength: 1000 },
                                formHelperText: { sx: { textAlign: 'right' } },
                            }}
                        />
                    </FormSection>

                    <FormSection title="3. Tid & spelare">
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                            <TextField
                                label="Startar"
                                type="datetime-local"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                            <TextField
                                label="Slutar"
                                type="datetime-local"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                        </Box>
                        <NumberStepper
                            label="Max antal spelare (med dig)"
                            value={maxPlayers}
                            onChange={setMaxPlayers}
                            min={2}
                            max={50}
                            helperText="De som joinar när det är fullt hamnar på reservlistan."
                            decreaseLabel="Färre spelare"
                            increaseLabel="Fler spelare"
                        />
                    </FormSection>

                    {error && <Alert severity="error">{error}</Alert>}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                        <Button variant="outlined" onClick={() => navigate(-1)}>
                            Avbryt
                        </Button>
                        <Button type="submit" variant="contained" disabled={isSaving}>
                            {isSaving ? 'Publicerar...' : 'Publicera'}
                        </Button>
                    </Box>
                </Box>

                <Box>
                    <Typography
                        sx={{ fontFamily: 'monospace', fontSize: 12, textTransform: 'uppercase', color: 'text.secondary', mb: 1 }}
                    >
                        Förhandsvisning
                    </Typography>
                    <EventCard
                        title={title.trim() || 'Namn på eventet'}
                        gameName={game?.name ?? 'Välj ett spel'}
                        coverUrl={game?.coverUrl}
                        timeLabel={startTime && endTime ? formatEventTime(startTime, endTime) : 'Välj tid'}
                        // to do: show the real name when we have the logged in user here
                        hostName="Du"
                        joined={1}
                        max={maxPlayers}
                        status="open"
                        statusLabel={spotsLeft === 1 ? '1 plats kvar' : `${spotsLeft} platser kvar`}
                    />
                </Box>
            </Box>
        </Box>
    );
}