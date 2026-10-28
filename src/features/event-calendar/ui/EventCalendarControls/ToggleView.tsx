import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material";
import type { CalendarView } from "../../models";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface ToggleViewProps {
	value: CalendarView;
	onChange: (event: React.MouseEvent<HTMLElement>, value: CalendarView) => void;
	viewValues: Record<CalendarView, { label: string; labelIcon: React.ReactNode }>;
	theme: Theme;
}

/**
 * Button component for switching the calendar view between week and month.
 * @param props
 */
const ToggleView = (props: ToggleViewProps) => {
	const lessThanMediumWidth = useMediaQuery(props.theme.breakpoints.down("md"));

	return (
		<ToggleButtonGroup
			aria-label={"toggle calendar view"}
			color={"primary"}
			exclusive
			onChange={props.onChange}
			size={"small"}
			sx={{ width: "min-content" }}
			value={props.value}
		>
			{Object.keys(props.viewValues).map((v) => {
				return (
					<ToggleButton
						aria-label={`${props.viewValues[v as CalendarView]} view`}
						value={v}
					>
						{
							// Smaller screens show icons; larger screens show texts.
							lessThanMediumWidth ?
								props.viewValues[v as CalendarView].labelIcon
							:	props.viewValues[v as CalendarView].label
						}
					</ToggleButton>
				);
			})}
		</ToggleButtonGroup>
	);
};

export default ToggleView;
