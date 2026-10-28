import { useEventCalendar } from "../EventCalendarContext";
import { Divider, styled } from "@mui/material";
import Stack from "@mui/material/Stack";

interface DisplayProps {
	children?: React.ReactNode;
}

const StyledGrid = styled("div")(({ theme }) => ({
	width: "min-content",
	height: "100%",
	minWidth: "100%",

	display: "grid",
	grid: "100 / auto-flow",
}));

const Display = (props: DisplayProps) => {
	const context = useEventCalendar();

	return (
		<>
			{context.calendarView === "week" && (
				<Stack
					direction={"row"}
					divider={<Divider flexItem orientation={"vertical"} />}
					sx={{ width: "min-content", minWidth: "100%", height: "100%" }}
				>
					{props.children}
				</Stack>
			)}
			{context.calendarView === "month" && <StyledGrid>{props.children}</StyledGrid>}
		</>
	);
};

export default Display;
