import type { EventCalendarResponseItem } from '@/features/event-calendar/models/event-calendar.types';
import type { DashboardEvent } from '@/features/dashboard/types/dashboard.types';

export function toDashboardEvent(u: EventCalendarResponseItem): DashboardEvent {
  return {
    id: u.id,
    title: u.title,
    startTime: new Date(u.startTime).toISOString(),
    endTime: new Date (u.endTime).toISOString(),
    gameName: u.game?.name ?? 'Okänt spel',
    coverUrl: u.game?.coverUrl ?? null,
    participantCount: u.participantCount ?? 0,
    maxParticipants: u.maxPlayers ?? 0,
    hostName: u.host?.displayName ?? 'Okänd värd'
  };
}

// Makes a human readable string of how many days until the event starts, e.g. "in 3 days" or "tomorrow"
export function formatDaysUntil(iso: string): string {
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.floor((startOfDay(new Date(iso)) - startOfDay(new Date())) / 86_400_000);

  return new Intl.RelativeTimeFormat('sv', { numeric: 'auto' }).format(days, 'day');
}
