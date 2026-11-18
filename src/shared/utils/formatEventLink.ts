import { PATH_EVENT } from "../routes/constants";

/**
 * Uses an event's id to format a link to its event page.
 * @returns A string formatted as `/event/{eventId}`, ex: `/event/23`.
 */
export function formatEventLink(eventId: number | string): string {
  return `${PATH_EVENT}/${eventId}`;
}
