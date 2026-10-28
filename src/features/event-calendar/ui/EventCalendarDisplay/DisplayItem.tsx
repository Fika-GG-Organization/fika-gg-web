import { styled, type Theme } from "@mui/material";
import Stack, { type StackProps } from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface DisplayItemProps extends StackProps {
	today: boolean;
	todayText: string;
	dayDate: number;
	dayName: string;
	theme: Theme;
}

const StyledStack = styled(Stack)<{ isToday: boolean }>(({ theme, isToday }) => ({
	padding: theme.spacing(1, 1),
	minWidth: "120px",
	width: "100%",
	height: "100%",

	backgroundColor:
		isToday ? theme.alpha(theme.palette.primary.light, 0.2) : theme.palette.background.default,
}));

const DisplayItem = ({ dayName, dayDate, today, theme, ...props }: DisplayItemProps) => {
	return (
		<StyledStack {...props} isToday={today}>
			<Stack direction={"row"} spacing={{ xs: 0.5, md: 1 }} sx={{ alignItems: "baseline" }}>
				<Typography
					sx={{
						fontSize: "0.7rem",
						fontWeight: theme.typography.fontWeightLight,
					}}
				>
					{!today ?
						`${dayName.toUpperCase()}`
					:	`${dayName.toUpperCase()} • ${props.todayText.toUpperCase()}`}
				</Typography>
				<Typography
					sx={{
						fontSize: "0.9rem",
						fontWeight: theme.typography.fontWeightBold,
						color: today ? theme.palette.primary.main : theme.palette.text.primary,
					}}
				>
					{dayDate.toString().length > 1 ?
						dayDate.toString()
					:	dayDate.toString().padStart(2, "0")}
				</Typography>
			</Stack>
			<Divider />
			<Stack direction={"column"} spacing={{ xs: 1 }}>
				{props.children}
			</Stack>
		</StyledStack>
	);
};

export default DisplayItem;
