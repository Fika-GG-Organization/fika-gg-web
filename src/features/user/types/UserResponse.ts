export interface UserResponse {
    id: string;
    displayName: string;
    avatarUrl?: string;
    userEvents: EventResponse[];
    hostedEvents: EventResponse[];
    ownedGames: OwnedGame[];
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
// a game on the users profile, gameId is our db id, use it for update/remove
export interface OwnedGame {
    gameId: number;
    rawgId: number | null;
    name: string;
    coverUrl: string | null;
    gamerTag: string | null;
}
