import { Box, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EventCard from 'shared/components/ui/EventCard';
import { mockEvents } from '../types/mockEvents';
import { formatEventTime } from 'shared/utils/formatEventTime';

export default function PublicEventsSection() {
	// TODO: Replace mockEvents with actual events from the API when available
	const events = mockEvents;

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

					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
							gap: 2
						}}
					>
						{events.map((event) => {
							const spotsleft = event.maxParticipants - event.participantsCount;
							const isFull = spotsleft <= 0;

							return (
								<EventCard
									key={event.id}
									title={event.title}
									gameName={event.gameName}	
									coverUrl={event.gameImageUrl}
									timeLabel={formatEventTime(event.startsAt, event.endsAt)}
									hostName={event.hostName}
									hostAvatarUrl={event.hostAvatarUrl}
									joined={event.participantsCount}
									max={event.maxParticipants}
									status={isFull ? 'full' : 'open'}
									statusLabel={isFull ? 'Fullt - reserv' : `${spotsleft === 1 ? 'plats' : 'platser' } kvar`}
									href={`/events/${event.id}`}
								/>
							);
						})}
					</Box>
			</Container>
		</Box>
	);
}