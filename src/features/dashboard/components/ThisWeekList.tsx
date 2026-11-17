import { Box } from "@mui/material";
import EventRow from "@/shared/components/ui/EventRow";
import type { DashboardEvent } from "../types/dashboard.types";
import EmptyState from "@/shared/components/ui/EmptyState";
import SectionHeader from './SectionHeader';

type Props = {
  events: DashboardEvent[];
}

export default function ThisWeeksList({ events }: Props) {
	return (
		<Box component="section">
			<SectionHeader
				title="Mina spel"
				link={events.length > 0 ? { label: 'Alla mina event',
				to: '/calendar' } : undefined} />
			{events.length === 0 ? (
				<EmptyState
					title="Inget planerat den här veckan"
					action={{ label: "Upptäck event", to: "/discover" }}
			/>
			) : (
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
					{events.map((e) => (
						<EventRow
							key={e.id}
							date={e.startTime}
							title={e.title}
							subtitle={`${e.gameName} - ${e.participantCount}/${e.maxParticipants}`}
							href={`/events/${e.id}`}
						/>
					))}
				</Box>
			)}
		</Box>
	);
}
