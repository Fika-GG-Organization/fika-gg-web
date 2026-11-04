import type { GameSearchResult } from "@/features/game/game.types";

export interface UserResponse {
    Id: string;
    DisplayName: string;
    AvatarUrl?: string;
    UserEvents: EventResponse[];
    HostedEvents: EventResponse[];
    OwnedGames: GameSearchResult[];
}

export interface EventResponse {
  id: number;
  title: string;
  eventStart: string; 
  eventEnd: string; 
  description?: string | null;
  gameId?: number | null;
  participantCount?: number | null;
  maxPlayers?: number | null;
}
