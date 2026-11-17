import { Container, Grid } from '@mui/material';
import ThisWeekList from '@/features/dashboard/components/ThisWeekList';
import OpenSpotsList from '@/features/dashboard/components/OpenSpotsList';
import NextEventCard from '@/features/dashboard/components/NextEventCard';
import MyGamesList from '@/features/dashboard/components/MyGamesList';
import type { DashboardEvent, DashboardGame } from '@/features/dashboard/types/dashboard.types';
import { useState, useEffect } from 'react';
import { getUserData } from '@/features/user/api/userApi';
import { addDays } from '@/shared/utils/dates';
import { getEventsAsync } from '@/features/event-calendar/api/eventCalendarApi';
import { toDashboardEvent } from '@/features/dashboard/dashboard.helpers';
import { Skeleton } from '@mui/material';

// Mock data for testing purposes
// const thisWeek: DashboardEvent[] = [
// 	{ id: 1,
// 		title: "Among Us Night",
// 		startTime: "2026-11-20T18:00:00Z",
// 		endTime: "2026-11-20T20:00:00Z",
// 		gameName: "Among Us",
// 		participantCount: 5,
// 		maxParticipants: 10,
// 		hostName: "Alice"
// 	},
// 	{ id: 2,
// 		title: "Valorant 5-stack",
// 		startTime: "2026-11-21T20:00:00Z",
// 		endTime: "2026-11-21T23:00:00Z",
// 		gameName: "Valorant",
// 		participantCount: 3,
// 		maxParticipants: 5,
// 		hostName: "Bob"
// 	}
// ];

// const nextEvent = thisWeek[0];

// const openSpots: DashboardEvent[] = [
// 	{ id: 10,
// 		title: "League of Legends Tournament",
// 		startTime: "2026-11-22T19:00:00Z",
// 		endTime: "2026-11-22T22:00:00Z",
// 		gameName: "League of Legends",
// 		participantCount: 8,
// 		maxParticipants: 16,
// 		hostName: "Charlie"
// 	},
// 	{ id: 11,
// 		title: "Minecraft Build Battle",
// 		startTime: "2026-11-23T17:00:00Z",
// 		endTime: "2026-11-23T19:00:00Z",
// 		gameName: "Minecraft",
// 		participantCount: 4,
// 		maxParticipants: 8,
// 		hostName: "Maria"
// 	},
// 	{ id: 12,
// 		title: "CS:GO Competitive Match",
// 		startTime: "2026-11-24T21:00:00Z",
// 		endTime: "2026-11-24T23:00:00Z",
// 		gameName: "CS:GO",
// 		participantCount: 2,
// 		maxParticipants: 10,
// 		hostName: "David"
// 	}
// ];

export default function DashboardPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [myGames, setMyGames] = useState<DashboardGame[]>([]);
	const [thisWeek, setThisWeek] = useState<DashboardEvent[]>([]);
	const [openSpots, setOpenSpots] = useState<DashboardEvent[]>([]);


	useEffect(() => {
		const now = new Date();
		const weekFromNow = addDays(now, 7);

		Promise.all([
			getUserData(),
			getEventsAsync({ 'start-time': now, 'end-time': addDays(now, 14) }),
		]).then(([user, upcoming]) => {
			const myEventIds = [...user.hostedEvents, ...user.userEvents].map((e) => e.id);
			const myGameIds = user.ownedGames.map((g) => g.rawgId);
			const ownedGames = user.ownedGames.filter((g) => g.name != null && g.name != null);

			const sorted = [...upcoming].sort(
				(a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
			);

			const mine = sorted.filter((u) => myEventIds.includes(u.id));
			const others = sorted.filter((u) => !myEventIds.includes(u.id));

			setThisWeek(
				mine.filter((u) => new Date(u.startTime) < weekFromNow).map(toDashboardEvent)
			);

			setOpenSpots(
				others
					.filter((u) => myGameIds.includes(u.game?.rawgId ?? -1))
					.filter((u) => (u.participantCount ?? 0) < (u.maxPlayers ?? 0))
					.slice(0, 3)
					.map(toDashboardEvent)
			);

			setMyGames(
				ownedGames.map((g) => ({
					id: g.rawgId,
					name: g.name,
					coverUrl: g.coverUrl,
					eventCount: upcoming.filter((u) => u.game?.rawgId === g.rawgId).length,
				}))
			);
			setIsLoading(false);
		});
	}, []);

	const nextEvent = thisWeek[0];

	if (isLoading)
	{
		return (
			<Container sx={{ py: 4 }}>
				<Skeleton variant="rounded" height={260} />
			</Container>
		)
	}

	return (
		<Container sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 6 }}>
			<NextEventCard event={nextEvent} />
			<Grid container spacing={4}>
				<Grid size={{ xs: 12, md: 6 }}>
					<ThisWeekList events={thisWeek} />
				</Grid>
				<Grid
					size={{ xs: 12, md: 6 }}
					sx={{ display: { xs: 'none', md: 'block' } }}
				>
					<MyGamesList games={myGames} />
				</Grid>
			</Grid>
			<OpenSpotsList events={openSpots} />
		</Container>
	);
}
