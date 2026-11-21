import { Box, Grid } from "@mui/material";
import EventCard from "@/shared/components/ui/EventCard";
import { formatEventTime } from "@/shared/utils/formatEventTime";
import { formatEventLink } from "@/shared/utils/formatEventLink";
import type { DashboardEvent } from "../types/dashboard.types";
import EmptyState from "@/shared/components/ui/EmptyState";
import SectionHeader from '../../../shared/components/ui/SectionHeader';

type Props = {
  events: DashboardEvent[];
};

export default function OpenSpotsList({ events }: Props) {
  return (
    <Box component="section">
      <SectionHeader
        title="Lediga platser i dina spel"
        link={events.length > 0 ? { label: 'Se fler på Upptäck', to: '/discover' } : undefined}
      />
      {events.length === 0 ? (
        <EmptyState
          title="Inga lediga platser just nu"
          description="När någon skapar ett event i dina spel dyker det upp här. Håll utkik!"
          action={{ label: 'Skapa ett event', to: '/events/new' }}
        />
      ) : (
        <Grid container spacing={2.5}>
          {events.map((e) => {
            const spotsLeft = e.maxParticipants - e.participantCount;

            return (
              <Grid key={e.id} size={{ xs: 12, sm: 6, md: 4}}>
                <EventCard
                  title={e.title}
                  gameName={e.gameName}
                  timeLabel={formatEventTime(e.startTime, e.endTime)}
                  hostName={e.hostName}
                  joined={e.participantCount}
                  max={e.maxParticipants}
                  status="open"
                  statusLabel={`${spotsLeft} platser kvar`}
                  href={formatEventLink(e.id)}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}

