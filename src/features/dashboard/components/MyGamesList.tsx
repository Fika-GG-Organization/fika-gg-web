import { Box, Typography } from '@mui/material';
import type { DashboardGame } from '../types/dashboard.types';
import GameBanner from '@/shared/components/ui/GameBanner';
import EmptyState from "@/shared/components/ui/EmptyState";
import SectionHeader from './SectionHeader';

type Props = {
  games: DashboardGame[];
}

export default function MyGamesList({ games }: Props) {
  return (
    <Box component="section">
      <SectionHeader title="Mina spel" link={{ label: '+ Lägg till spel', to: '/games' }} />
      {games.length === 0 ? (
        <EmptyState
          title="Inga spel än"
          description="Lägg till dina spel så visar vi event du kan hoppa in i."
        />
      ) : (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5
        }}
      >
          {games.map((g) => (
            <Box
              key={g.id}
              sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                py: 1,
                pl: 1.5,
                pr: 2,
                borderRadius: 999,
                border: `1.5px solid ${theme.palette.fika.line}`,
              })}
            >
              <Box
                sx={{
                  width: 32, height: 32, borderRadius: '50%', overflow: 'hidden'
                }}
              >
                <GameBanner
                  name={g.name}
                  coverUrl={g.coverUrl}
                  variant='thumb'
                  fill
                />
              </Box>
              <Typography sx={{ fontWeight: 600 }}>
                {g.name}
              </Typography>
              <Typography
                sx={{
                  fontsize: 13,
                  color: 'text.Secondary'
                }}
              >
                {g.eventCount} event
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
