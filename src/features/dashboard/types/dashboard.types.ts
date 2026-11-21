export interface DashboardEvent {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  gameName: string;
  coverUrl: string | null;
  hostName: string;
  participantCount: number;
  maxParticipants: number;
}

export interface DashboardGame {
  id: number;
  name: string;
  coverUrl: string | null;
  eventCount: number;
}
