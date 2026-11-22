import { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { getUserData } from "@/features/user/api/userApi";
import type { EventResponse, OwnedGame, UserResponse } from "@/features/user/types/UserResponse";
import EditGameDialog from "@/features/user/components/EditGameDialog";
import EventRow from "@/shared/components/ui/EventRow";
import ProfileHeader from "@/shared/components/ui/ProfileHeader";
import UserGameList from "@/shared/components/ui/UserGameList";
import { formatEventTime } from "@/shared/utils/formatEventTime";
import { formatEventLink } from "@/shared/utils/formatEventLink";
import EmptyState from "@/shared/components/ui/EmptyState";
import FilterChips from "@/shared/components/ui/FilterChips";

export default function UserPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [me, setMe] = useState<UserResponse | undefined>();
  const [editingGame, setEditingGame] = useState<OwnedGame | null>(null);
  const [reloadKey, setReloadKey] = useState(0); // bump this to refetch the profile after editing a game
  const [eventFilter, setEventFilter] = useState<"all" | "hosting" | "joined">("all");

  useEffect(() => {
    async function fetchMe() {
      await getUserData().then((res) => {
        setMe({
          id: res.id,
          displayName: res.displayName,
          avatarUrl: res.avatarUrl,
          userEvents: res.userEvents,
          hostedEvents: res.hostedEvents,
          ownedGames: res.ownedGames,
        });
        setIsLoading(false);
      });
    }
    fetchMe();
  }, [reloadKey]);

	/** Combines events that user hosts with events that user joined into one */
  const mapEvents = useCallback((hostedEvents: EventResponse[], userEvents: EventResponse[]) => {
    const all = [...hostedEvents, ...userEvents];
    return all.filter((e, i) => all.findIndex((x) => x.id === e.id) === i); // remove duplicates
  }, []);

  const allEvents = me ? mapEvents(me.hostedEvents, me.userEvents) : [];
  const isHost = (v: EventResponse) => me?.hostedEvents.some((h) => h.id === v.id) ?? false;
  const filteredEvents = eventFilter === "all" ? allEvents : allEvents.filter((v) => isHost(v) === (eventFilter === "hosting"));
  const now = new Date();
  const upcomingEvents = filteredEvents.filter((v) => new Date(v.eventStart) > now);
  const pastEvents = filteredEvents.filter((v) => new Date(v.eventStart) <= now);
  const subtitleFor = (v: EventResponse) =>
    `${me?.hostedEvents.some((h) => h.id === v.id) ? "Värd" : "Deltagare"} · ${formatEventTime(v.eventStart, v.eventEnd)} · ${v.participantCount ?? "?"}/${v.maxPlayers ?? "?"}`;

  return (
    <Box sx={{ maxWidth: 1120, mx: "auto" }}>
      {isLoading && me === undefined && <CircularProgress />}
      {!isLoading && me !== undefined && (
        <>
          <ProfileHeader
            name={me.displayName}
            avatarUrl={me.avatarUrl}
            stats={[
              { label: "Spel", value: me.ownedGames.length },
              { label: "Värd för", value: me.hostedEvents.length },
              { label: "Deltagare i", value: me.userEvents.length - me.hostedEvents.length },
            ]}
          />

          <Grid container spacing={4} sx={{ mt: 6 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <UserGameList
                games={me.ownedGames.map((g) => ({
                  id: g.gameId,
                  name: g.name,
                  coverUrl: g.coverUrl,
                  gamerTag: g.gamerTag,
                }))}
                onAdd={() => {}}
                onEdit={(id) => setEditingGame(me.ownedGames.find((g) => g.gameId === id) ?? null)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <FilterChips
                    label="Filtrera event"
                    options={[
                      { value: "all", label: "Alla" },
                      { value: "hosting", label: "Värd" },
                      { value: "joined", label: "Deltagare" },
                    ]}
                    selected={eventFilter}
                    onChange={(value) => setEventFilter(value as "all" | "hosting" | "joined")
                    }
                  />
                {upcomingEvents.length > 0 && (
                <Box
                  component="section"
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Typography component="h2" sx={{ fontSize: 22, fontWeight: 700 }}>
                    Kommande event
                  </Typography>
                    {upcomingEvents.map((v) => (
                      <EventRow
                        key={v.id}
                        date={v.eventStart}
                        title={v.title}
                        subtitle={subtitleFor(v)}
                        href={formatEventLink(v.id)}
                      />
                    ))}
                </Box>
                )}
                {pastEvents.length > 0 && (
                <Box
                  component="section"
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Typography component="h2" sx={{ fontSize: 22, fontWeight: 700 }}>
                    Tidigare event
                  </Typography>
                    {pastEvents.map((v) => (
                      <EventRow
                        key={v.id}
                        date={v.eventStart}
                        title={v.title}
                        subtitle={subtitleFor(v)}
                        href={formatEventLink(v.id)}
                      />
                    ))}
                </Box>
                )}
                {filteredEvents.length === 0 && (
                    <EmptyState
                      title={
                        eventFilter === "hosting" ? "Du är inte värd för några event än"
                        : eventFilter === "joined" ? "Du har inte gått med i några event än"
                        : "Du har inga event än"
                      }
                      action={
                        eventFilter === "hosting"
                        ? { label: "Skapa event", to: "/events/new" }
                        : { label: "Upptäck event", to: "/discover" }
                      }
                    />
                )}
              </Box>
            </Grid>
          </Grid>
        </>
      )}
      {/* pop-up modal for editing games */}
      {editingGame && (
        <EditGameDialog
          game={editingGame}
          onClose={() => setEditingGame(null)}
          onSaved={() => setReloadKey((k) => k + 1)}
        />
      )}
    </Box>
  );
}
