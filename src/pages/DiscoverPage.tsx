import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import DiscoverSearchbar, { type DiscoverTimeFilter } from "@/components/discover/DiscoverSearchbar";
import EmptyState from "@/shared/components/ui/EmptyState";
import EventCard from "@/shared/components/ui/EventCard";
import FilterChips from "@/shared/components/ui/FilterChips";
import { formatEventTime } from "@/shared/utils/formatEventTime";

const games = ["Valorant", "League of Legends", "Counter-Strike 2", "Minecraft"];

function daysFromToday(days: number, hour: number) {
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    date.setDate(date.getDate() + days);
    return date;
}

function nextWeekday(weekdayOffset: number, hour: number) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - ((date.getDay() + 6) % 7) + 7 + weekdayOffset);
    date.setHours(hour);
    return date;
}

const events = [
    {
        id: 1,
        title: "Lördags-rankat",
        gameName: "Valorant",
        startsAt: daysFromToday(2, 18),
        endsAt: daysFromToday(2, 21),
        hostName: "Alex",
        joined: 3,
        max: 5,
        status: "open" as const,
        statusLabel: "2 platser kvar",
    },
    {
        id: 2,
        title: "Fredagsmys med gänget",
        gameName: "Counter-Strike 2",
        startsAt: nextWeekday(2, 19),
        endsAt: nextWeekday(2, 22),
        hostName: "Sam",
        joined: 5,
        max: 5,
        status: "full" as const,
        statusLabel: "Fullt",
    },
];

function getDateRange(filter: DiscoverTimeFilter, today: Date): [Date, Date] | null {
    const start = new Date(today);
    start.setHours(0, 0, 0, 0);

    if (filter === "all") return null;
    if (filter === "today") {
        const end = new Date(start);
        end.setDate(end.getDate() + 1);
        return [start, end];
    }

    if (filter === "week" || filter === "next-week") {
        start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
        if (filter === "next-week") start.setDate(start.getDate() + 7);
        const end = new Date(start);
        end.setDate(end.getDate() + 7);
        return [start, end];
    }

    start.setDate(1);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    return [start, end];
}

export default function DiscoverPage() {
    const [search, setSearch] = useState("");
    const [when, setWhen] = useState<DiscoverTimeFilter>("all");
    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const [selectedGame, setSelectedGame] = useState("all");

    const filteredEvents = useMemo(() => {
        const query = search.trim().toLocaleLowerCase();
        const dateRange = getDateRange(when, new Date());

        return events.filter((event) => {
            const matchesSearch = !query || [event.title, event.gameName, event.hostName]
                .some((value) => value.toLocaleLowerCase().includes(query));
            const matchesGame = selectedGame === "all" || event.gameName === selectedGame;
            const matchesAvailability = !onlyAvailable || event.joined < event.max;
            const matchesDate = !dateRange
                || (event.startsAt >= dateRange[0] && event.startsAt < dateRange[1]);

            return matchesSearch && matchesGame && matchesAvailability && matchesDate;
        });
    }, [search, when, onlyAvailable, selectedGame]);

    const gameOptions = [
        { value: "all", label: "Alla spel" },
        ...games.map((game) => ({ value: game, label: game })),
    ];

    return (
        <Box sx={{ maxWidth: 1120, mx: "auto" }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Upptäck event
                </Typography>
                <Typography color="text.secondary">
                    Hitta ett spelgäng och hoppa in.
                </Typography>
            </Box>

            <DiscoverSearchbar
                search={search}
                onSearchChange={setSearch}
                when={when}
                onWhenChange={setWhen}
                onlyAvailable={onlyAvailable}
                onOnlyAvailableChange={setOnlyAvailable}
            />

            <Box sx={{ mt: 3, mb: 4 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.25 }}>
                    Filtrera på spel
                </Typography>
                <FilterChips
                    label="Filtrera event på spel"
                    options={gameOptions}
                    selected={selectedGame}
                    onChange={setSelectedGame}
                    scroll
                />
            </Box>

            <Box sx={{ mb: 1.5, display: "flex", alignItems: "baseline", gap: 1 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 750 }}>
                    Kommande event
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "event"}
                </Typography>
            </Box>

            {filteredEvents.length === 0 ? (
                <EmptyState
                    title="Inga event matchar filtren"
                    description="Prova att ändra sökningen eller välja andra filter."
                />
            ) : (
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: 2 }}>
                    {filteredEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            title={event.title}
                            gameName={event.gameName}
                            timeLabel={formatEventTime(event.startsAt.toISOString(), event.endsAt.toISOString())}
                            hostName={event.hostName}
                            joined={event.joined}
                            max={event.max}
                            status={event.status}
                            statusLabel={event.statusLabel}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}
