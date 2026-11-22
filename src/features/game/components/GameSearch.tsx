import { useEffect, useState } from "react";
import { Autocomplete, Avatar, Box, Button, Link, TextField, Typography } from "@mui/material";
import { searchGames } from "../api/gameApi";
import type { GameSearchResult } from "../game.types";
import { addGameToUser } from "@/features/user/api/userApi";
import { useToast } from "@/app/toast";

type GameSearchProps = {
    onAdded?: () => void;
    ownedRawgIds?: number[];
};

export const GameSearch = ({ onAdded, ownedRawgIds = [] }: GameSearchProps) => {
    const [input, setInput] = useState("");
    const [options, setOptions] = useState<GameSearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState<GameSearchResult | null>(null);
    const toast = useToast();

    useEffect(() => {
        if (input.trim().length < 2) {
            return;
        }

        let ignore = false;
        const timer = setTimeout(async () => {
            setIsLoading(true);
            try {
                const results = await searchGames(input);
                if (!ignore) {
                    setOptions(results);
                }
            } catch {
                if (!ignore) {
                    setOptions([])
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }, 300);

        return () => {
            ignore = true;
            clearTimeout(timer);
        };
    }, [input]);

    const isTooShort = input.trim().length < 2;
    return (
        <Box>
            <Autocomplete
                options={isTooShort ? [] : options}
                value={selected}
                onChange={(_, value) => setSelected(value)}
                onInputChange={(_, value) => setInput(value)}
                getOptionLabel={(game) => game.name}
                isOptionEqualToValue={(a, b) => a.rawgId === b.rawgId}
                filterOptions={(x) => x}
                loading={isLoading}
                noOptionsText={isTooShort ? "Skriv minst 2 tecken" : "Inga spel hittades"}
                renderOption={(props, game) => {
                    const { key, ...optionProps } = props;
                    const isOwned = ownedRawgIds.includes(game.rawgId);
                    return (
                        <Box
                            component="li"
                            key={key}
                            {...optionProps}
                            sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                        >
                            <Avatar src={game.coverUrl ?? undefined} variant ="rounded" />
                            <Box sx={{ flexGrow: 1 }}>{game.name}</Box>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                disabled={isOwned}
                                sx={{ minHeight: 32, px: 1.5 }}
                                onClick={async (event) => {
                                    event.stopPropagation();
                                    try {
                                      await addGameToUser(game.rawgId);
                                      toast(`${game.name} har lagts till`, { variant: "success" });
                                      onAdded?.();
                                    } catch {
                                      toast(`Kunde inte lägga till ${game.name}`, { variant: "error" });
                                    }
                                }}
                            >
                                {isOwned ? "Tillagd" : "Lägg till"}
                            </Button>
                        </Box>
                    );
                }}
                renderInput={(params) => <TextField {...params} label="Sök spel" />}
            />
            <Typography variant="caption" color="text.secondary">
                Game data from{" "}
                <Link href="https://rawg.io" target="_blank" rel="noopener">
                    RAWG
                </Link>
            </Typography>
        </Box>
    )
}
