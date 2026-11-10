import { useCallback, useEffect, useState } from "react";
import { getEventsAsync } from "../api";
import type { EventCalendarResponse } from "../models";
import Box from "@mui/material/Box";
import CalendarToolbar, { type CalendarView } from "@/shared/components/ui/CalendarToolbar";
import CalendarLegend from "@/shared/components/ui/CalendarLegend";
import WeekView from "@/shared/components/ui/WeekView";
import MonthView from "@/shared/components/ui/MonthView";
import {
	addDays,
	addMonths,
	endOfDay,
	monthGrid,
	startOfDay,
	startOfMonth,
	startOfWeek,
	weekColumns,
} from "@/shared/utils/dates";
import type { CalendarItem } from "@/shared/components/ui/CalendarEvent";

const EventCalendar = () => {
	const [_isLoading, setIsLoading] = useState<boolean>(true);
	const [data, setData] = useState<EventCalendarResponse>([]);
	const [calendarView, setCalendarView] = useState<CalendarView>("week");
	const [today, _setToday] = useState<Date>(new Date());
	const [step, setStep] = useState<number>(0);

	const onViewChange = useCallback(
		(value: CalendarView) => {
			console.debug("Calendar view set to:", value);
			setCalendarView(value);
		},
		[calendarView],
	);
	const onNext = useCallback(() => {
		setStep(step + 1);
	}, [step]);
	const onPrev = useCallback(() => {
		setStep(step - 1);
	}, [step]);
	const onToday = useCallback(() => {
		setStep(0);
	}, [step]);

	function calendarDates(): Date[] {
		switch (calendarView) {
			case "week":
				return weekColumns(addDays(today, step * 7));
			case "month":
				return monthGrid(addMonths(today, step));
		}
	}

	useEffect(() => {
		async function fetch(start: Date, end: Date) {
			const res = await getEventsAsync({
				"start-time": start,
				"end-time": end,
			}).then(
				(response) => response,
				(_err): EventCalendarResponse => [],
			);
			console.debug(`Data is:`, res);
			setData(res);
			setIsLoading(false);
		}

		setIsLoading(true);
		let d = calendarDates();
		fetch(startOfDay(d[0]), endOfDay(d[d.length - 1]));
	}, [calendarView, step]);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<CalendarToolbar
				label={`${calendarDates().at(0)?.toLocaleDateString()} - ${calendarDates().at(-1)?.toLocaleDateString()}`}
				view={calendarView}
				onViewChange={onViewChange}
				onNext={onNext}
				onPrev={onPrev}
				onToday={onToday}
			/>
			{calendarView === "week" && (
				<WeekView
					weekStart={startOfWeek(addDays(today, step * 7))}
					today={today}
					items={data.map((v, i): CalendarItem => {
						return {
							id: i,
							start: v.startTime,
							title: v.title,
							timeLabel: "",
							look: v.participantCount! >= v.maxPlayers! ? "full" : "open",
						};
					})}
				/>
			)}
			{calendarView === "month" && (
				<MonthView
					month={startOfMonth(addMonths(today, step))}
					today={today}
					items={data.map((v, i): CalendarItem => {
						return {
							id: i,
							start: v.startTime,
							title: v.title,
							timeLabel: "",
							look: v.participantCount! >= v.maxPlayers! ? "full" : "open",
						};
					})}
				/>
			)}
			<CalendarLegend />
		</Box>
	);
};

export default EventCalendar;
