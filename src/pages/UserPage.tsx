import { Box, Grid, Typography } from "@mui/material";

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
  return (
    <Box sx={{ maxWidth: 1120, mx: "auto" }}>
      <ProfileHeader
        name="Alex Karlsson"
        subtitle="Medlem sedan september 2026 · Stockholm"
        stats={[
          { label: "spel", value: games.length },
          { label: "event", value: 18 },
          { label: "som värd", value: 6 },
        ]}
      />

      <Grid container spacing={4} sx={{ mt: 6}}>
        <Grid size={{ xs: 12, md: 5 }}>
          <UserGameList games={games} onAdd={() => {}} onEdit={() => {}} />
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
    </Box>
  );
}
