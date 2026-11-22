import { useEffect, useMemo, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import DiscoverSearchbar, { type DiscoverTimeFilter } from "@/components/discover/DiscoverSearchbar";
import EmptyState from "@/shared/components/ui/EmptyState";
import EventCard from "@/shared/components/ui/EventCard";
import FilterChips from "@/shared/components/ui/FilterChips";
import { formatEventTime } from "@/shared/utils/formatEventTime";
import { formatEventLink } from '@/shared/utils/formatEventLink';
import { getEventsAsync } from "@/features/event-calendar/api";
import { addDays } from "@/shared/utils/dates";

type DiscoverEvent = {
    id: number;
    title: string;
    gameName: string;
    coverUrl?: string | null;
    startsAt: Date;
    endsAt: Date;
    hostName: string;
    hostAvatarUrl?: string | null;
    joined: number;
    max: number;
    status: "open" | "full";
    statusLabel: string;
};

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

  const PAGE_SIZE = 10;

export default function DiscoverPage() {
    const [search, setSearch] = useState("");
    const [when, setWhen] = useState<DiscoverTimeFilter>("all");
    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const [selectedGame, setSelectedGame] = useState("all");
    const [events, setEvents] = useState<DiscoverEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const resetPaging = () => setVisibleCount(PAGE_SIZE);

    useEffect(() => {
      const now = new Date();
      getEventsAsync({"start-time": now, "end-time": addDays(now, 60)})
        .then((data) =>
          setEvents(
            data.map((e) => {
              const joined = e.participantCount ?? 0;
              const max = e.maxPlayers ?? 0;
              const spotsLeft = max - joined;
              return {
                id: e.id,
                title: e.title,
                gameName: e.game?.name ?? "Okänt spel",
                coverUrl: e.game?.coverUrl,
                startsAt: new Date(e.startTime),
                endsAt: new Date(e.endTime),
                hostName: e.host?.displayName ?? "",
                hostAvatarUrl: e.host?.avatarUrl,
                joined,
                max,
                status: spotsLeft > 0 ? ("open" as const) : ("full" as const),
                statusLabel: spotsLeft > 0 ? `${spotsLeft} ${spotsLeft === 1 ? "plats" : "platser"} kvar` : "Fullt",
              };
            })
          )
        )
        .catch(() => { setEvents([]) })
        .finally(() => { setIsLoading(false) });
    }, []);

    const games = [...new Set(events.map((e) => e.gameName))];

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
    }, [events, search, when, onlyAvailable, selectedGame]);

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
                onSearchChange={value => { setSearch(value); resetPaging(); }}
                when={when}
                onWhenChange={value => { setWhen(value); resetPaging(); }}
                onlyAvailable={onlyAvailable}
                onOnlyAvailableChange={value => { setOnlyAvailable(value); resetPaging(); }}
            />

            <Box sx={{ mt: 3, mb: 4 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.25 }}>
                    Filtrera på spel
                </Typography>
                <FilterChips
                    label="Filtrera event på spel"
                    options={gameOptions}
                    selected={selectedGame}
                    onChange={(value) => { setSelectedGame(value); resetPaging(); }}
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

            {isLoading ? null : filteredEvents.length === 0 ? (
                <EmptyState
                    title="Inga event matchar filtren"
                    description="Prova att ändra sökningen eller välja andra filter."
                />
            ) : (
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: 2 }}>
                    {filteredEvents.slice(0, visibleCount).map((event) => (
                        <EventCard
                            key={event.id}
														href={formatEventLink(event.id)}
                            title={event.title}
                            gameName={event.gameName}
                            coverUrl={event.coverUrl}
                            timeLabel={formatEventTime(event.startsAt.toISOString(), event.endsAt.toISOString())}
                            hostName={event.hostName}
                            hostAvatarUrl={event.hostAvatarUrl}
                            joined={event.joined}
                            max={event.max}
                            status={event.status}
                            statusLabel={event.statusLabel}
                        />
                    ))}
                </Box>
            )}
            {visibleCount < filteredEvents.length && (
              <Box sx={{
                display: "flex",
                justifyContent: "center",
                mt: 3,
              }}>
                <Button
                  variant="outlined"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                >
                  Visa fler {filteredEvents.length - visibleCount} event
                </Button>
              </Box>
            )}
        </Box>
    );
}
