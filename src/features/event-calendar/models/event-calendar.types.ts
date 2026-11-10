/**
 * Represents the HTTP Request's query parameters.
 */
export interface EventCalendarQueryParams {
	"start-time": Date;
	"end-time": Date;
}

/**
 * Represents the HTTP Response body. Contains an array of events.
 */
export interface EventCalendarResponse extends Array<EventCalendarResponseItem> {}

/**
 * Represents a single event in the response array.
 */
export interface EventCalendarResponseItem {
	id: number;
	hostId: string;
	title: string;
	description: string | null;
	gameId: number | null;
	startTime: Date;
	endTime: Date;
	coverUrl: string | null;
	participantCount: number | null;
	maxPlayers: number | null;
	createdAt: Date;
}

/**
 * Used in setting the calendar display.
 *
 * If `CalendarView` is:
 * - `"week"`: event calendar should show 7 days.
 * - `"month"`: event calendar should show a month view.
 */
export type CalendarView = "week" | "month";

/**
 * Used by calendar components keep track of days to show in the calendar and to set {@linkcode EventCalendarQueryParams}.
 */
export type DateRange = {
	/** Array of all dates. Length vary based on {@linkcode CalendarView} */
	all: Date[];
	/** The first element in {@linkcode DateRange.all} */
	first: Date;
	/** The last element in {@linkcode DateRange.all} */
	last: Date;
};
