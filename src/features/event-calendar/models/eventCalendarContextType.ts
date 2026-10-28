import type { CalendarView, DateSpan, EventCalendarResponse } from "../models/event-calendar.types";

export interface EventCalendarContextType {
	isLoading: boolean;
	data: EventCalendarResponse | null;
	dateSpan: DateSpan;
	dateRange: Date[];
	filterShowFullEvents: boolean;
	filterGames: number[];
	calendarView: CalendarView;
	setCalendarView: React.Dispatch<React.SetStateAction<CalendarView>>;
}
