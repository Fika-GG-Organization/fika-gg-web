// matches CreateEventDTO in the backend
export interface EventCreateRequest {
    title: string;
    description: string | null;
    startTime: string;
    endTime: string;
    maxPlayers: number;
    createdAt: string;
    eventGame: {
        rawgId: number;
        name: string;
        coverUrl: string | null;
    };
}