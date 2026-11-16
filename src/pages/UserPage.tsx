import { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { getUserData } from "@/features/user/api/userApi";
import type { EventResponse, UserResponse } from "@/features/user/types/UserResponse";
import EventRow from "@/shared/components/ui/EventRow";
import ProfileHeader from "@/shared/components/ui/ProfileHeader";
import UserGameList from "@/shared/components/ui/UserGameList";
import { formatEventTime } from "@/shared/utils/formatEventTime";
import { formatEventLink } from "@/shared/utils/formatEventLink";

export default function UserPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [me, setMe] = useState<UserResponse | undefined>();

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
  }, []);

	/** Combines events that user hosts with events that user joined into one */
  const mapEvents = useCallback((hostedEvents: EventResponse[], userEvents: EventResponse[]) => {
    const m1 = hostedEvents.map((v) => v);
    m1.push(...userEvents.map((v) => v));
    return m1;
  }, []);

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
              { label: "Events", value: me.hostedEvents.length },
            ]}
          />

          <Grid container spacing={4} sx={{ mt: 6 }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <UserGameList
                games={[
                  ...me.ownedGames.map((v) => ({
                    id: v.rawgId,
                    name: v.name,
                    // gamerTag: v.
                    coverUrl: v.coverUrl,
                  })),
                ]}
                onAdd={() => {}}
                onEdit={() => {}}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Box
                  component="section"
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Typography component="h2" sx={{ fontSize: 22, fontWeight: 700 }}>
                    Kommande event
                  </Typography>
                  {mapEvents(me.hostedEvents, me.userEvents).map((v) => {
                    // Check if the event start date is in the future
                    if (new Date(v.eventStart) > new Date()) {
                      return (
                        <EventRow
                          key={v.id}
                          date={v.eventStart}
                          title={v.title}
                          // hostedEvents has no game title name.
                          subtitle={`PLACEHOLDER · ${formatEventTime(v.eventStart, v.eventEnd)} · ${v.participantCount ?? "?"}/${v.maxPlayers ?? "?"}`}
                          href={formatEventLink(v.id)}
                          // status={}
                          // statusLabel={""}
                        />
                      );
                    }
                  })}
                </Box>

                <Box
                  component="section"
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Typography component="h2" sx={{ fontSize: 22, fontWeight: 700 }}>
                    Tidigare event
                  </Typography>
                  {mapEvents(me.hostedEvents, me.userEvents).map((v) => {
                    if (new Date() > new Date(v.eventStart)) {
                      return (
                        <EventRow
                          key={v.id}
                          date={v.eventStart}
                          title={v.title}
                          // hostedEvents has no game title name.
                          subtitle={`PLACEHOLDER · ${formatEventTime(v.eventStart, v.eventEnd)} · ${v.participantCount ?? "?"}/${v.maxPlayers ?? "?"}`}
                          href={formatEventLink(v.id)}
                          // status={}
                          // statusLabel={""}
                        />
                      );
                    }
                  })}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}
