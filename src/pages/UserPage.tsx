import { useCallback, useEffect, useState } from "react";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { useToast } from "@/app/toast";
import { getUserData } from "@/features/user/api/userApi";
import type { UserResponse } from "@/features/user/types/UserResponse";
import EventRow from "@/shared/components/ui/EventRow";
import ProfileHeader from "@/shared/components/ui/ProfileHeader";
import UserGameList from "@/shared/components/ui/UserGameList";

const games = [
  { id: 1, name: "Valorant", gamerTag: "alexk#4410" },
  { id: 2, name: "League of Legends", gamerTag: "alexk-euw" },
  { id: 3, name: "Counter-Strike 2", gamerTag: "alexk" },
  { id: 4, name: "Minecraft", gamerTag: "alexcraft" },
];

const upcomingEvent = {
  date: "2026-11-07T18:00:00",
  title: "Lördags-rankat",
  subtitle: "Valorant · 18:00–21:00 · 3/5 spelare",
  status: "joined" as const,
  statusLabel: "Deltar",
};

const pastEvent = {
  date: "2026-10-24T19:00:00",
  title: "Fredagsmys med gänget",
  subtitle: "Counter-Strike 2 · 19:00–22:00 · 5 spelare",
  status: "host" as const,
  statusLabel: "Värd",
};

export default function UserPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [me, setMe] = useState<UserResponse | undefined>();
  const toast = useToast();

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
  });

  return (
    <Box sx={{ maxWidth: 1120, mx: "auto" }}>
      {isLoading && me === undefined && <Skeleton></Skeleton>}
      {!isLoading && me === undefined && <Typography>{"Something went wrong"}</Typography>}
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
                onEdit={useCallback((id: string | number) => {
                  toast("Cannot edit gamer tag because that property does not exist.", { variant: "error" });
                  // There's no 'gamerTag' property in ownedGames: GameSearchResult
                }, [])}
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
                  <EventRow {...upcomingEvent} />
                </Box>

                <Box
                  component="section"
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Typography component="h2" sx={{ fontSize: 22, fontWeight: 700 }}>
                    Tidigare event
                  </Typography>
                  <EventRow {...pastEvent} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}
