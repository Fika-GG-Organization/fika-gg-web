import { Box, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EventCard from 'shared/components/ui/EventCard';
import EmptyState from 'shared/components/ui/EmptyState';
import { useEffect, useState } from 'react';
import { formatEventTime } from '@/shared/utils/formatEventTime';
import { formatEventLink } from '@/shared/utils/formatEventLink';
import { addDays } from '@/shared/utils/dates';
import { getEventsAsync } from '@/features/event-calendar/api';
import type { EventCalendarResponseItem } from '@/features/event-calendar/models/event-calendar.types';

export default function PublicEventsSection() {
	const [events, setEvents] = useState<EventCalendarResponseItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const now = new Date();
		getEventsAsync({ 'start-time': now, 'end-time': addDays(now, 7) })
			.then((data) => setEvents(data.slice(0, 6)))
			.catch(() => setEvents([]))
			.finally(() => setLoading(false));
	}, []);

  return (
		<Box component="section">
			<Container
				maxWidth="lg"
				sx={{ py: { xs: 5, md: 7 } }}>
					<Box
						sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'baseline',
						mb: 3
						}}
					>
						<Typography
							variant="h2"
							sx={{
								fontSize: { xs: '2rem', md: '2.5rem' },
								fontWeight: 700,
								mb: 3
							}}
						>
							Händer den här veckan
						</Typography>
						<Link
							component={RouterLink}
							to="/events"
							sx={{
								color: 'text.Primary',
								fontWeight: 600
							}}
							>
							Se alla events
						</Link>
					</Box>
					{!loading && events.length === 0 && (
						<EmptyState
							title="Inga events"
							action={{ label: 'Kom igång', to: '/register' }}
						/>
					)}
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
							gap: 2
						}}
					>
						{events.map((event) => {
							const spotsleft = (event.maxPlayers ?? 0) - (event.participantCount ?? 0);
							const isFull = spotsleft <= 0;

							return (
								<EventCard
									key={event.id}
									title={event.title}
									gameName={event.game?.name ?? 'Okänt spel'}
									coverUrl={event.game?.coverUrl}
									timeLabel={formatEventTime(String(event.startTime), String(event.endTime))}
									hostName={event.host?.displayName}
									hostAvatarUrl={event.host?.avatarUrl}
									joined={event.participantCount ?? 0}
									max={event.maxPlayers ?? 0}
									status={isFull ? 'full' : 'open'}
									statusLabel={isFull ? 'Fullt - reserv' : `${spotsleft === 1 ? 'plats' : 'platser' } kvar`}
									href={formatEventLink(event.id)}
								/>
							);
						})}
					</Box>
			</Container>
		</Box>
	);
}
