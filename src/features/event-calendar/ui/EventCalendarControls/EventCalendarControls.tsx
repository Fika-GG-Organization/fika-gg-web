import { useEventCalendar } from "../EventCalendarContext";
import type { CalendarView } from "../../models";
import type { Theme } from "@mui/material";
import Stack from "@mui/material/Stack";
import IconViewWeek from "@mui/icons-material/ViewWeek";
import IconViewMonth from "@mui/icons-material/CalendarViewMonth";
import ToggleView from "./ToggleView";
import FilterGames from "./FilterGames";
import DateSelector from "./DateSelector";

interface EventCalendarControlsProps {
	theme: Theme;
}

/**
 * Component for calendar controls
 * @param props 
 * @returns 
 */
const EventCalendarControls = (props: EventCalendarControlsProps) => {
	const context = useEventCalendar();

	function handleToggleCalendarView(
		_event: React.MouseEvent<HTMLElement>, // 'event' checks where the mouse clicks, do not remove!!!!
		newValue: CalendarView,
	) {
		if (newValue !== null) {
			console.log("Calendar view set to:", newValue);
			context.setCalendarView(newValue);
		}
	}

	return (
		<Stack
			aria-controls={"event-calendar-display"}
			component={"section"}
			direction={"column"}
			spacing={1}
			sx={{
				paddingBlock: {
					xs: props.theme.spacing(1),
					md: props.theme.spacing(2),
				},
			}}
		>
			<Stack
				direction={"row"}
				spacing={1}
				sx={{
					justifyContent: { xs: "space-between", md: "flex-end" },
				}}
			>
				<DateSelector {...props} />
				<ToggleView
					value={context.calendarView}
					onChange={handleToggleCalendarView}
					viewValues={{
						week: { label: "Vecka", labelIcon: <IconViewWeek /> },
						month: { label: "Månad", labelIcon: <IconViewMonth /> },
					}}
					{...props}
				/>
			</Stack>
			<FilterGames gameData={[]} {...props} />
		</Stack>
	);
};

export default EventCalendarControls;
