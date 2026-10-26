import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useEventCalendar } from "./EventCalendarContext";
import GameSearch from "./GameSearch";
import FlexBox from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ButtonGroup } from "@mui/material";

const NO_GAME_FILTER = "Alla spel";
const VIEW_VALUES = ["Vecka", "Månad"];

interface FilterGroupProps {}

const StyledStack = styled(Stack)(({ theme }) => ({
	gap: theme.spacing(2),
	paddingBlock: theme.spacing(1),
}));

const FilterGroup = () => {
	const context = useEventCalendar();

	const [all, setAll] = useState<boolean>(true);

	function handleClick() {
		setAll(true);
	}
	function handleClick2() {
		setAll(false);
	}

	function handleDelete() {}

	function handleClickLeft() {}
	function handleClickRight() {}

	return (
		<StyledStack direction={"column"}>
			<Stack direction={"row"} sx={{ justifyContent: "flex-end" }}>
				<ToggleButtonGroup aria-label={"view select"} exclusive>
					<ToggleButton value={"week"} aria-label={"week"}>
						{VIEW_VALUES[0]}
					</ToggleButton>
					<ToggleButton value={"month"} aria-label={"month"}>
						{VIEW_VALUES[1]}
					</ToggleButton>
				</ToggleButtonGroup>
			</Stack>
			<Stack
				direction={"row"}
				spacing={1}
				sx={{ justifyContent: "space-between", alignItems: "center" }}
			>
				<Stack
					direction={"row"}
					spacing={1}
					sx={{ overflow: "auto", scrollbarWidth: "thin" }}
				>
					<Chip
						label={`${NO_GAME_FILTER}`}
						onClick={handleClick}
						color={all === true ? "primary" : "default"}
					/>
					<Divider orientation={"vertical"} flexItem />
					<Chip
						variant={"outlined"}
						label={`Valorant`}
						onClick={handleClick2}
						onDelete={handleDelete}
					/>
				</Stack>
				<GameSearch />
			</Stack>
		</StyledStack>
	);
};

export default FilterGroup;
