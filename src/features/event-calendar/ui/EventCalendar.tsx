import { useCallback, useEffect, useState } from "react";
import { getEventsAsync } from "../api";
import { LABEL_FILTER, VALUE_ALL } from "../config/constants";
import type { EventCalendarResponse } from "../models";
import { formatCalendarItems } from "../utils/formatCalendarItems";
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
import Stack from "@mui/material/Stack";
import FilterChips from "@/shared/components/ui/FilterChips";
import { removeDuplicatesBy } from "@/shared/utils/removeDuplicatesBy";

const EventCalendar = () => {
	// to do: add a loading state to the calendar, there was an unused isLoading here before
	// const [_isLoading, setIsLoading] = useState<boolean>(true);
	const [data, setData] = useState<EventCalendarResponse>([]);
	const [selectedFilter, setSelectedFilter] = useState<string>(VALUE_ALL);
	const [calendarView, setCalendarView] = useState<CalendarView>("week");
	const [today] = useState<Date>(new Date());
	const [step, setStep] = useState<number>(0);

	const onViewChange = useCallback(
		(value: CalendarView) => {
			setCalendarView(value);
		},
		[],
	);
	const onNext = useCallback(() => {
		setStep(step + 1);
	}, [step]);
	const onPrev = useCallback(() => {
		setStep(step - 1);
	}, [step]);
	const onToday = useCallback(() => {

		setStep(0);
	}, []);

	/** Set filter chips options */
	const options = useCallback(() => {
		return [
			{ value: VALUE_ALL, label: "Alla spel" },
			...removeDuplicatesBy(data, d => d.game!.name).flatMap(v => {
				return v.game ? { value: v.game.name, label: v.game.name } : []
			}),
		];
	}, [data])

	const calendarDates = useCallback((): Date[] => {
		switch (calendarView) {
			case "week":
				return weekColumns(addDays(today, step * 7));
			case "month":
				return monthGrid(addMonths(today, step));
		}
	}, [calendarView, today, step]);

	useEffect(() => {
		async function fetch(start: Date, end: Date) {
			const res = await getEventsAsync({
				"start-time": start,
				"end-time": end,
			}).then(
				(response) => response,
				(): EventCalendarResponse => [],
			);
			setData(res);
		}
		const d = calendarDates();
		fetch(startOfDay(d[0]), endOfDay(d[d.length - 1]));
	}, [calendarDates]);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<Stack
				direction={{ xs: "column", md: "row" }}
				spacing={{ xs: 2, md: 2 }}
				sx={{ justifyContent: "space-between" }}
			>
				<FilterChips
					label={LABEL_FILTER}
					options={options()}
					selected={selectedFilter}
					onChange={(value) => { setSelectedFilter(value); }}
					scroll
				/>
				<CalendarToolbar
					label={`${calendarDates().at(0)?.toLocaleDateString()} - ${calendarDates().at(-1)?.toLocaleDateString()}`}
					view={calendarView}
					onViewChange={onViewChange}
					onNext={onNext}
					onPrev={onPrev}
					onToday={onToday}
				/>
			</Stack>
			{calendarView === "week" && (
				<WeekView
					weekStart={startOfWeek(addDays(today, step * 7))}
					today={today}
					items={formatCalendarItems(data, selectedFilter)}
				/>
			)}
			{calendarView === "month" && (
				<MonthView
					month={startOfMonth(addMonths(today, step))}
					today={today}
					items={formatCalendarItems(data, selectedFilter)}
				/>
			)}
			<CalendarLegend />
		</Box>
	);
};

export default EventCalendar;
