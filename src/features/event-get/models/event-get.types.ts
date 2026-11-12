export interface EventGetResponse {
	id: number;
	hostId: string;
	title: string;
	description?: string;
	game?: EventGetGame;
	startTime: Date;
	endTime: Date;
	participantCount?: number;
	maxPlayers?: number;
	players: Array<EventGetParticipant>;
	createdAt: Date;
}

export interface EventGetGame {
	id: number;
	rawgId?: number;
	name: string;
	coverUrl?: string;
}

export interface EventGetParticipant {
	eventId: number;
	userId: string;
	displayName: string;
	avatarUrl: string | null;
	gamerTag: string | null;
	participantStatus: ParticipantStatus;
	joinedAt: Date;
}

export interface EventLayoutProps {
	isLoading: boolean;
	data: EventGetResponse | undefined;
}

/**
 * Represents user participation status to an event.
 * - 0 = Joined: User has joined.
 * - 1 = Backup: User has joined and is above max player limit.
 */
export type ParticipantStatus = "0" | "1";
