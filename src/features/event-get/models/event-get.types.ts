/**
 * Represents the HTTP Response body for getting a single event.
 */
export interface EventGetResponse {
	id: number;
	host: EventGetHost;
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

/**
 * Represents a game in the event.
 */
export interface EventGetGame {
	id: number;
	rawgId?: number;
	name: string;
	coverUrl?: string;
}

/** Represents the event's host. */
export interface EventGetHost {
	id: string;
	displayName: string;
	avatarUrl?: string | undefined;
}

/**
 * Represents a participant in the event participants list.
 */
export interface EventGetParticipant {
	eventId: number;
	userId: string;
	displayName: string;
	avatarUrl: string | null;
	gamerTag: string | null;
	status: ParticipantStatus;
	joinedAt: Date;
}

/**
 * Props for EventLayouts.
 */
export interface EventLayoutProps {
	isLoading: boolean;
	data: EventGetResponse | undefined;
	/** Represents event interaction buttons. */
	actions?: React.ReactNode;
}

/**
 * Represents user participation status to an event.
 * - 0 = Joined: User has joined.
 * - 1 = Backup: User has joined and is above max player limit.
 */
export type ParticipantStatus = 0 | 1;
