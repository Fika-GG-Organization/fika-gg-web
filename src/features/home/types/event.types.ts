export type EventSummary = {
	id: string;
	title: string;
	gameName: string;
	gameImageUrl?: string | null;
	startsAt: string;
	endsAt: string;
	hostName: string;
	hostAvatarUrl?: string | null;
	participantsCount: number;
	maxParticipants: number;
}