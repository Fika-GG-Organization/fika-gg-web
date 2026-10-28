import { useEffect, useState } from "react";
import type { DateSpan, CalendarView, EventCalendarResponse } from "../models/event-calendar.types";
import { EventCalendarContext } from "./EventCalendarContext";
import { getEventsAsync } from "../api/event-calendarService";
import DataDisplayWrapper from "./DataDisplayWrapper";
import FilterGroup from "./FilterGroup";
import EventCalendarContainer from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import DisplayWeek from "./DisplayWeek";
import Box from "@mui/material/Box";

const EventCalendar = () => {
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
				component={"section"}
				sx={{ display: "flex", flexDirection: "column", gap: 1 }}
			>
				<FilterGroup />
				<DataDisplayWrapper>
					{isLoading === true && 
						<Box sx={{
							display: "flex", 
							justifyContent: "center", 
							alignItems: "center", 
							width: "100%", 
							height: "100%"}}
						>
							<CircularProgress aria-label="Loading..." />
						</Box>
					}
					{isLoading === false && 
						(calendarView === "week" && <DisplayWeek></DisplayWeek>) ||
						(calendarView === "month" && (<b>{"Month view not yet implemented!!!"}</b>)) ||
						(calendarView === null && <b>{`Type '${calendarView}' has an invalid value.`}</b>)
					}
				</DataDisplayWrapper>
			</EventCalendarContainer>
		</EventCalendarContext.Provider>
	);
};

export default EventCalendar;
