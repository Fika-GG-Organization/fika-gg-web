import { styled } from "@mui/material/styles";
import { useEventCalendar } from "./EventCalendarContext";
import type { EventCalendarResponseItem } from "../models/event-calendar.types";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CalendarCard from "./CalendarCard";

const TEXT_TODAY = "Idag";

interface ColumnProps {
	today: boolean;
	dayDate: number;
	dayName: string;
	data: EventCalendarResponseItem[];
}

const StyledStack = styled(Stack)<{ isToday: boolean }>(({ theme, isToday }) => ({
	border: "1px solid",
	borderColor: theme.palette.divider,
	backgroundColor: 
		(isToday) 
		? theme.alpha(theme.palette.primary.light, "0.2") 
		: theme.palette.background.default,

	padding: theme.spacing(1, 1),

	minWidth: "120px",
	width: "100%",
	height: "100%",

	[theme.breakpoints.up("md")]: {
		// Apply these CSS rules when screen width is above 900px (default)
		// https://mui.com/material-ui/customization/breakpoints/
		width: "100%",
	},
}));

const ColumnHeader1 = styled(Typography)(({ theme }) => ({
	fontSize: "0.7rem",
	fontWeight: theme.typography.fontWeightLight,
}));
const ColumnHeader2 = styled(Typography)<{ isToday: boolean }>(({ theme, isToday }) => ({
	fontSize: "0.9rem",
	fontWeight: theme.typography.fontWeightBold,
	color: isToday ? theme.palette.primary.main : theme.palette.text.primary,
}));

const Column = ({ today = false, ...props }: ColumnProps) => {
	/**
	 * Filters props data, excluding any event whose start date is not equal to {@linkcode props.dayDate}.
	 * Then takes the filtered result and maps each to an individual {@linkcode CalendarCard} to be displayed.
	 * @returns Array of {@linkcode CalendarCard} components; or nothing of props data is empty.
	 */
	function mapFilteredData() {
		if (props.data.length <= 0) {
			return undefined;
		}
		const data = props.data.filter((value) => value.eventStart.getDate() === props.dayDate);
		return data.length > 0 ?
				undefined
			:	data.map((obj) => (
					<CalendarCard
						id={obj.id}
						title={obj.title}
						eventStart={obj.eventStart}
						eventEnd={obj.eventEnd}
						description={obj.description}
						gameId={obj.gameId}
						coverUrl={obj.coverUrl}
						attendees={obj.attendees}
						maxAttendees={obj.maxAttendees}
					/>
				));
	}

	return (
		<StyledStack isToday={today} direction={"column"}>
			<Stack direction={"row"} spacing={{ xs: 0.5, md: 1 }} sx={{ alignItems: "baseline" }}>
				<ColumnHeader1>
					{today !== true 
					? `${props.dayName.toUpperCase()}` 
					: `${props.dayName.toUpperCase()} • ${TEXT_TODAY.toUpperCase()}`}
				</ColumnHeader1>
				<ColumnHeader2 isToday={today} >
					{(props.dayDate.toString().length > 1) 
						? `${props.dayDate}`
						: `0${props.dayDate}`}
				</ColumnHeader2>
			</Stack>
			<Divider variant={"fullWidth"} />
			<Stack direction={"column"} spacing={{ xs: 1, sm: 2 }}>
				{mapFilteredData()}
			</Stack>
		</StyledStack>
	);
};

const WEEKDAYS_SV = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];

const DisplayWeek = () => {
	const context = useEventCalendar();

	function checkIfDayIsToday(day: Date): boolean {
		const today = new Date();
		if (
			today.getFullYear() === day.getFullYear() &&
			today.getMonth() === day.getMonth() &&
			today.getDate() === day.getDate()
		) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<Stack direction={"row"} sx={{ width: "min-content", minWidth: "100%", height: "100%" }}>
			{context.dateRange.map((value, index) => {
				return (
					<Column
						data={context.data ?? []}
						dayName={WEEKDAYS_SV[index]}
						dayDate={value.getDate()}
						today={checkIfDayIsToday(value) ? true : false}
					/>
				);
			})}
		</Stack>
	);
};

export default DisplayWeek;
