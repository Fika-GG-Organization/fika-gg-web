import type { GameSearchResult } from "@/features/game/game.types";

export interface UserResponse {
    id: string;
    displayName: string;
    avatarUrl?: string;
    userEvents: EventResponse[];
    hostedEvents: EventResponse[];
    ownedGames: GameSearchResult[];
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

export interface SiteTheme {
    themePreference: "light" | "dark";
}