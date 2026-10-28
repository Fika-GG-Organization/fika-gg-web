import { useEffect, useState } from "react";
import { type Theme } from "@mui/material";
import type { DateSpan, CalendarView, EventCalendarResponse } from "../models";
import { getEventsAsync } from "../api/event-calendarService";
import { EventCalendarContext } from "./EventCalendarContext";
import EventCalendarContainer from "@mui/material/Box";
import EventCalendarControls from "./EventCalendarControls";
import EventCalendarDisplay from "./EventCalendarDisplay";

interface EventCalendarProps {
	theme: Theme;
}

const EventCalendar = (props: EventCalendarProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [calendarView, setCalendarView] = useState<CalendarView>("week");

	const [dateSpan, setDateSpan] = useState<DateSpan>({ start: new Date(), end: new Date() });
	const [dateRange, setDateRange] = useState<Date[]>([]);

	const [showFullEvents, setShowFullEvents] = useState<boolean>(true);
	const [gameId, setGameId] = useState<number[]>([]);

	const [responseData, setResponseData] = useState<EventCalendarResponse | null>(null);

	useEffect(() => {
		async function fetch(controller: AbortController) {
			const data = await getEventsAsync(
				{
					"start-date": dateSpan.start,
					"end-date": dateSpan.end,
				},
				controller.signal,
			);
			if (data != null) {
				setResponseData(data);
			}
			setIsLoading(false);
		}

		setIsLoading(true);

		if (calendarView === "month") {
			const d = new Date().getWeekFromDate();
			setDateSpan({ start: d.at(0)!, end: d.at(-1)! });
			setDateRange(d);
		} else {
			const d = new Date().getWeekFromDate();
			setDateSpan({ start: d.at(0)!, end: d.at(-1)! });
			setDateRange(d);
		}

		const controller = new AbortController();

		// Timeout is for testing only
		// Move fetch out
		setTimeout(() => {
			fetch(controller);
		}, 3000);

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<EventCalendarContext.Provider
			value={{
				isLoading: isLoading,
				data: responseData,
				dateRange: dateRange,
				dateSpan: dateSpan,
				calendarView: calendarView,
				filterShowFullEvents: showFullEvents,
				filterGames: gameId,
				setCalendarView: setCalendarView,
			}}
		>
			<EventCalendarContainer
				sx={{ display: "flex", flexDirection: "column", gap: 1 }}
			>
				<EventCalendarControls theme={props.theme} />
				<EventCalendarDisplay theme={props.theme} />
			</EventCalendarContainer>
		</EventCalendarContext.Provider>
	);
};

export default EventCalendar;
