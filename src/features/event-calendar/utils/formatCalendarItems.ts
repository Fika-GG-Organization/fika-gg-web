import type { EventCalendarResponse } from "../models";
import { VALUE_ALL } from "../config/constants";
import type { CalendarItem, CalendarEventLook } from "@/shared/components/ui/CalendarEvent";
import { formatEventLink } from "@/shared/utils/formatEventLink";
import { formatLocaleTime } from "@/shared/utils/formatEventTime";

/**
 * Helper function for setting `MonthView.items` and `WeekView.items`.
 */
export function formatCalendarItems(
  data: EventCalendarResponse,
	userId: string | undefined,
  filter?: string | undefined,
): CalendarItem[] {
  return data
    .filter((v) => {
			// If there's no filter or if filter is set to all, all calendar items will be returned.
      if (!filter || filter === VALUE_ALL) {
        return v;
      }
			// Return if filter matches game name
      return v.game?.name === filter;
    })
    .map((v): CalendarItem => {
      let look: CalendarEventLook = "open";
      if (userId !== undefined && userId !== null && v.host?.id === userId) {
        look = "mine";
      } else if (v.participantCount! >= v.maxPlayers!) {
        look = "full";
      }
      return {
        id: v.id,
        href: formatEventLink(v.id),
        start: v.startTime,
        title: v.title,
        ariaLabel: v.title,
        look: look,
        timeLabel: formatLocaleTime(v.startTime),
        detail: `${v.game?.name} · ${v.participantCount ?? "?"}/${v.maxPlayers ?? "?"}`,
      };
    });
}
