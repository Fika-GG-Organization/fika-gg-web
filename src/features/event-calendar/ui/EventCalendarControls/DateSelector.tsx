import { useEffect, useState } from "react";
import { useEventCalendar } from "../EventCalendarContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconCalendar from "@mui/icons-material/CalendarMonth";
import IconChevronLeft from "@mui/icons-material/ChevronLeft";
import IconChevronRight from "@mui/icons-material/ChevronRight";

interface DateSelectorProps {
	theme: Theme
}

/**
 * Date Selector Mockup
 * 
 * WARNING, doesn't do anything.
 * @param props
 */
const DateSelector = (props: DateSelectorProps) => {
	const context = useEventCalendar();
	const lessThanSmallWidth = useMediaQuery(props.theme.breakpoints.down("sm"));
	
	const [calendarLabel, setCalendarLabel] = useState<string>("");

	function handlePickLeft() {}
	function handlePickRight() {}

	useEffect(() => {
		const str = `${context.dateSpan.start.toLocaleDateString()} 
		- 
		${context.dateSpan.end.toLocaleDateString()}`
		setCalendarLabel(str);
	}, [context])

	return (
		<ButtonGroup aria-label={"date selector"} size={"medium"} sx={{ width: "max-content" }} >
			{
				lessThanSmallWidth ? 
				undefined 
				: <Button 
						children={<IconChevronLeft />} 
						onClick={handlePickLeft}
					/>
			}
			<Button sx={{ width: "max-content" }}>
				{
					lessThanSmallWidth 
					? <IconCalendar /> 
					: <> <IconCalendar /> {calendarLabel} </>
				}
				
			</Button>
			{
				lessThanSmallWidth ? 
				undefined 
				: <Button 
						children={<IconChevronRight />} 
						onClick={handlePickRight}
					/>
			}
		</ButtonGroup>
	);
};

export default DateSelector;
