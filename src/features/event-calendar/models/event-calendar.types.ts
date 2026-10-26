/**
 * Represents the HTTP GET Request's query parameters.
 */
export interface EventCalendarQueryParams {
	"start-date": Date;
	"end-date": Date;
}

/**
 * Represents the HTTP Response body. Contains an array of events.
 */
export interface EventCalendarResponse extends Array<EventCalendarResponseItem> {}

/**
 * Represents an event in the array of the HTTP Response body.
 */
export interface EventCalendarResponseItem {
	id: number;
	title: string;
	eventStart: Date;
	eventEnd: Date;
	description: string | null;
	gameId: number | null;
	coverUrl: string | null;
	attendees: number | null;
	maxAttendees: number | null;
}

/**
 * Used in setting the calendar display.
 * 
 * If `CalendarView` is:
 * - `"week"`: event calendar should show 7 days.
 * - `"month"`: event calendar should show 28-31 days, depending on month.
 */
export type CalendarView = "week" | "month";

/**
 * Used by components to set {@linkcode EventCalendarQueryParams}.
 */
export type DateSpan = {
	start: Date;
	end: Date;
};
