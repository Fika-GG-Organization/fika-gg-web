import type { CalendarView, DateSpan, EventCalendarResponse } from "../models/event-calendar.types";

export interface EventCalendarContextType {
	data: EventCalendarResponse | null;
	dateSpan: DateSpan;
	dateRange: Date[];
	calendarView: CalendarView;
	filterShowFullEvents: boolean;
	filterGames: number[];
	setCalendarView: React.Dispatch<React.SetStateAction<CalendarView>>;
}
