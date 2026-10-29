import { useEventCalendar } from "../EventCalendarContext";
import { type Theme } from "@mui/material";
import { type BoxProps } from "@mui/material/Box";
import LoadingSpinner from "./LoadingSpinner";
import DisplayWrapper from "./DisplayWrapper";
import Display from "./Display";
import DisplayItem from "./DisplayItem";
import Card from "./CardEventCalendar";

const LABEL_LOADING = "Laddar...";
const LABEL_WEEKDAYS = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];
const LABEL_TODAY = "Idag";
const DEFAULT_COVER_URL = "";

interface EventCalendarDisplayProps extends BoxProps {
	theme: Theme;
}

/**
 * The calendar display for showing events by date. 
 */
const EventCalendarDisplay = ({ children, ...props }: EventCalendarDisplayProps) => {
	const context = useEventCalendar();

	return (
		<DisplayWrapper 
			id={"event-calendar-display"}
			aria-busy={context.isLoading}
			aria-describedby={"event-calendar-spinner"}
			component={"section"}
		>
			{context.isLoading && (
				<LoadingSpinner
					aria-label={LABEL_LOADING}
					color={"secondary"}
					id={"event-calendar-spinner"}
				/>
			)}
			{!context.isLoading && (
				<Display children={context.dateRange.map((d, index) => (
						<DisplayItem
							key={d.getDate()}
							dayDate={d.getDate()}
							dayName={LABEL_WEEKDAYS[index]}
							theme={props.theme}
							today={d.compareDayWith(new Date())}
							todayText={LABEL_TODAY}
							children={
								context.data !== null ?
									Array.from(
										context.data
											.filter((v) => v.eventStart.getDate() === d.getDate())
											.map((value) => (
												<Card
													defaultCoverUrl={DEFAULT_COVER_URL}
													data={value}
												/>
											)),
									)
								:	undefined
							}
						/>
					))} 
				/>
			)}
		</DisplayWrapper>
	);
};

export default EventCalendarDisplay;
