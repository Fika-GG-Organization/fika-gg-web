import { Box, Checkbox, FormControlLabel, MenuItem, TextField } from "@mui/material";

export type DiscoverTimeFilter = "all" | "today" | "week" | "next-week" | "month";

type DiscoverSearchbarProps = {
    search: string;
    onSearchChange: (value: string) => void;
    when: DiscoverTimeFilter;
    onWhenChange: (value: DiscoverTimeFilter) => void;
    onlyAvailable: boolean;
    onOnlyAvailableChange: (value: boolean) => void;
};

export default function DiscoverSearchbar({
    search,
    onSearchChange,
    when,
    onWhenChange,
    onlyAvailable,
    onOnlyAvailableChange,
}: DiscoverSearchbarProps) {
    return (
        <Box
            sx={(theme) => ({
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) 190px auto" },
                alignItems: "center",
                gap: 1.5,
                p: { xs: 1.5, sm: 2 },
                border: `1.5px solid ${theme.palette.fika.line}`,
                borderRadius: 3,
                bgcolor: "background.paper",
            })}
        >
            <TextField
                label="Sök event"
                placeholder="Eventnamn, spel eller värd"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                size="small"
                fullWidth
            />
            <TextField
                select
                label="När"
                value={when}
                onChange={(event) => onWhenChange(event.target.value as DiscoverTimeFilter)}
                size="small"
                fullWidth
            >
                <MenuItem value="all">Alla datum</MenuItem>
                <MenuItem value="today">Idag</MenuItem>
                <MenuItem value="week">Den här veckan</MenuItem>
                <MenuItem value="next-week">Nästa vecka</MenuItem>
                <MenuItem value="month">Den här månaden</MenuItem>
            </TextField>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={onlyAvailable}
                        onChange={(event) => onOnlyAvailableChange(event.target.checked)}
                    />
                }
                label="Bara lediga platser"
                sx={{ m: 0, whiteSpace: "nowrap" }}
            />
        </Box>
    );
}
