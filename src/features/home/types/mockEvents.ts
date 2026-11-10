import type { EventSummary } from './event.types';

export const mockEvents: EventSummary[] = [
  {
		id: '1',
		title: 'Fredagsmys 5-stack',
		gameName: 'Valorant',
		startsAt: '2026-11-11T18:00:00Z',
		endsAt: '2026-11-12T00:00:00Z',
		hostName: 'Alex K',
		participantsCount: 3,
		maxParticipants: 5
	},
	{
		id: '2',
		title: 'Chill 3v3 efter skolan',
		gameName: 'Rocket League',
		startsAt: '2026-11-13T16:30:00Z',
		endsAt: '2026-11-13T19:00:00Z',
		hostName: 'Isak E',
		participantsCount: 6,
		maxParticipants: 6
	},
	{
		id: '3',
		title: 'Byggkväll: slottservern',
		gameName: 'Minecraft',
		startsAt: '2026-11-14T20:00:00Z',
		endsAt: '2026-11-15T00:00:00Z',
		hostName: 'George A',
		participantsCount: 4,
		maxParticipants: 10
	}
];