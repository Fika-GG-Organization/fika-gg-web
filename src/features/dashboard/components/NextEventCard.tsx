import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import GameBanner from '@/shared/components/ui/GameBanner';
import StatusPill from '@/shared/components/ui/StatusPill';
import { formatEventTime } from '@/shared/utils/formatEventTime';
import { formatEventLink } from '@/shared/utils/formatEventLink';
import type { DashboardEvent } from '../types/dashboard.types';
import EmptyState from "@/shared/components/ui/EmptyState";
import SectionHeader from './SectionHeader';
import { formatDaysUntil } from '../dashboard.helpers';

type Props = {
  event?: DashboardEvent;
}

export default function NextEventCard({ event }: Props) {

  if (!event)
  {
    return (
      <Box component="section">
        <Typography
          component="h2"
          sx={{
            fontSize: 28,
            fontWeight: 700,
            mb: 2
          }}
        >
          Nästa event
        </Typography>
        <EmptyState
          title="Inget planerat"
          description="Hitta en spelkväll att hoppa in i, eller skapa en egen."
          action={{ label: 'Upptäck event', to: '/discover' }}
        />
      </Box>
    );
  }

  const spotsLeft = event.maxParticipants - event.participantCount;

  return (
    <Box component="section">
      <SectionHeader
        title="Nästa event"
        meta={formatDaysUntil(event.startTime)}
      />
      <Card>
        <CardActionArea
          component={RouterLink}
          to={formatEventLink(event.id)}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'stretch',
          }}
        >
          <Box sx={{
            width: { xs: "100%", md: "40%" },
            height: { xs: 140, md: 260 }
            }}
          >
            <GameBanner name={event.gameName} fill/>
          </Box>
          <Box sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
          >
            <Box sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Typography sx={{
                fontFamily: "monospace",
                fontSize: 12,
                textTransform: 'uppercase',
                color: "text.Secondary"
              }}>
                {event.gameName}
              </Typography>
              <StatusPill status="joined" label="Med" />
            </Box>

            <Typography
              component="h3"
              sx={{
                fontSize: {xs: 18, md: 24 },
                fontWeight: 700
              }}
            >
              {event.title}
            </Typography>

            <Typography sx={{ color: 'text.Secondary' }}>
              {formatEventTime(event.startTime, event.endTime)}
              {event.hostName && ` - värd: ${event.hostName}`}
            </Typography>

            <Typography
              sx={{
                color: 'text.Secondary',
                fontSize: 14
              }}
            >
              {event.participantCount} / {event.maxParticipants} med - {spotsLeft} platser kvar
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Box>
  );
}
