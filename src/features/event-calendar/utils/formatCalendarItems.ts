import { useAuth } from "@/app/auth/useAuth";
import type { EventCalendarResponse } from "../models";
import type { CalendarItem, CalendarEventLook } from "@/shared/components/ui/CalendarEvent";
import { formatEventLink } from "@/shared/utils/formatEventLink";
import { formatLocaleTime } from "@/shared/utils/formatEventTime";

/**
 * Helper function for setting `MonthView.items` and `WeekView.items`.
 */
export function formatCalendarItems(data: EventCalendarResponse): CalendarItem[] {
  const { user } = useAuth();

  return data.map((v): CalendarItem => {
    let look: CalendarEventLook = "open";

    if (user != null && v.host?.id === user.id) {
      look = "mine";
    } else if (v.participantCount! >= v.maxPlayers!) {
      look = "full";
    }

    return {
      id: v.id,
      href: formatEventLink(v.id),
      start: v.startTime,
      title: v.title,
      look: look,
      timeLabel: formatLocaleTime(v.startTime),
    };
  });
}
