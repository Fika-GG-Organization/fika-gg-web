import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { getEventsAsync } from "../api";
import { LABEL_FILTER, VALUE_ALL } from "../config/constants";
import type { EventCalendarResponse } from "../models";
import { formatCalendarItems } from "../utils/formatCalendarItems";
import { useAuth } from "@/app/auth/useAuth";
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
import { useToast } from "@/app/toast";

const EventCalendar = () => {
	// to do: add a loading state to the calendar, there was an unused isLoading here before
	// const [_isLoading, setIsLoading] = useState<boolean>(true);
	const { user } = useAuth();
	const [data, setData] = useState<EventCalendarResponse>([]);
	const [selectedFilter, setSelectedFilter] = useState<string>(VALUE_ALL);
	const [calendarView, setCalendarView] = useState<CalendarView>("week");
	const [today] = useState<Date>(new Date());
	const [step, setStep] = useState<number>(0);
	const toast = useToast();
	const selectedFilterRef = useRef(selectedFilter);
	useEffect(() => {
		selectedFilterRef.current = selectedFilter;
	}, [selectedFilter]);

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

	/** Set filter chips options 
	 * the chips come from the loaded events, 
	 * so keep the picked game in the list even if this week doesnt haVe it, 
	 * otherwise the filter gets stuck with an empty calender and nothing selected.
	*/
	const options = useMemo(() => {
		const games = data.flatMap((v) => (v.game ? [{ value: v.game.name, label: v.game.name }] : []));
		
		if (selectedFilter !== VALUE_ALL) {
			games.push({ value: selectedFilter, label: selectedFilter});
		}
	
		// sorted so the chips dont jump around every time u change week
		const unique = removeDuplicatesBy(games, (g) => g.value)
			.sort((a, b) => a.label.localeCompare(b.label, 'sv'));

		return [{ value: VALUE_ALL, label: "Alla spel" }, ...unique];
	}, [data, selectedFilter])

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

			const current = selectedFilterRef.current;
			if (current !== VALUE_ALL && !res.some((e) => e.game?.name === current))
			{
				setSelectedFilter(VALUE_ALL);
				toast(`Inga ${current} events hittades, visar alla spel.`, { variant: "warning" });
			}
		}
		const d = calendarDates();
		fetch(startOfDay(d[0]), endOfDay(d[d.length - 1]));
	}, [calendarDates, toast]);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<Stack spacing={2}>
				<CalendarToolbar
					label={`${calendarDates().at(0)?.toLocaleDateString()} - ${calendarDates().at(-1)?.toLocaleDateString()}`}
					view={calendarView}
					onViewChange={onViewChange}
					onNext={onNext}
					onPrev={onPrev}
					onToday={onToday}
				/>
				<FilterChips
					label={LABEL_FILTER}
					options={options}
					selected={selectedFilter}
					onChange={(value) => { setSelectedFilter(value); }}
					scroll={false}
				/>
			</Stack>
			{calendarView === "week" && (
				<WeekView
					weekStart={startOfWeek(addDays(today, step * 7))}
					today={today}
					items={formatCalendarItems(data, user?.id, selectedFilter)}
				/>
			)}
			{calendarView === "month" && (
				<MonthView
					month={startOfMonth(addMonths(today, step))}
					today={today}
					items={formatCalendarItems(data, user?.id, selectedFilter)}
				/>
			)}
			<CalendarLegend />
		</Box>
	);
};

export default EventCalendar;
