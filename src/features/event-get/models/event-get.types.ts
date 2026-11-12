import type { ParticipantStatus } from "@/shared/types/user.types";

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
