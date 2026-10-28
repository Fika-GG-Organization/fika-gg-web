import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchRounded from "@mui/icons-material/SearchRounded";

const LABEL_RESET_FILTER_BUTTON = "Alla spel";
const LABEL_PLACEHOLDER = "Filtrera efter spel"
const LABEL_NO_OPTIONS_FOUND = "Inga spel hittades";

const StyledStack = styled(Stack)(() => ({
	justifyContent: "space-between",
	alignItems: "center",
	width: "100%",
}));

const ChipsStack = styled(Stack)(() => ({
	alignItems: "center",
	width: "100%",
	overflow: "auto",
	scrollbarWidth: "thin",
	scrollbarGutter: "auto",
}));

interface FilterGamesProps {
	gameData: string[];
}

const seededGameTitles: string[] = [
	"Valorant",
	"Animal Crossing",
	"Donkey Kong",
	"Shadow the Hedgehog",
];

/**
 * Filter calendar by games.
 * 
 * CURRENTLY BROKEN! Needs fixing: 
 * - search bar spills out on smaller screen widths
 * - cannot click on the boxes/chips rendered outside the Autocomplete component 
 * to remove value from {@link showFilter} state
 * - reset filter button can empty {@link showFilter} but not the Autocomplete's 
 * selected options state
 * @param param0 
 */
const FilterGames = ({ gameData = seededGameTitles }: FilterGamesProps) => {
	const [showFilter, setShowFilter] = useState<string[]>([]);

	function handleResetFilter() {
		setShowFilter([]);
		console.log("Filter is reset.");
	};

	useEffect(() => {
		let str = "";
		showFilter.forEach((v, i) => str += `${i}: [${v}]\n`);
		console.log(`showFilter was accessed. Current state contain:\n${(str.length > 0) ? str : "empty"}`);
	}, [showFilter]);

	return (
		<StyledStack 
			direction={{xs: "column-reverse", md: "row"}}
			spacing={{xs: 1, md: 1}}
		>
			<ChipsStack direction={"row"} spacing={1}>
				<Chip
					color={showFilter.length > 0 ? "default" : "primary"}
					label={LABEL_RESET_FILTER_BUTTON}
					onClick={handleResetFilter}
					variant={showFilter.length > 0 ? "outlined" : "filled"}
				/>
				<Divider flexItem orientation={"vertical"} />
				{showFilter.map((v) => (
					<Chip 
						color={"secondary"}
						key={v}
						label={v}
						onDelete={(e) => {
							setShowFilter(values => values.filter((v) => v !== e))
						}}
					/>
				))}
			</ChipsStack>
			<Autocomplete 
				fullWidth
				size={"small"}
				sx={{overflow: "hidden"}}
				filterSelectedOptions
				clearOnBlur
				multiple
				options={gameData}
				noOptionsText={LABEL_NO_OPTIONS_FOUND}
				onChange={(_e, v) => setShowFilter(v)}
				limitTags={2}
				slotProps={{
					chip: {
						"aria-description": "Press Backspace or Delete to remove",
					},
				}}
				renderInput={(params) => (
					<TextField 
						{...params}
						aria-label={"search filter"}
						placeholder={LABEL_PLACEHOLDER}
						sx={{overflow: "hidden"}}
						slotProps={{
							...params.slotProps,
							input: {
								...params.slotProps.input,
								"aria-description": `Press Left Arrow to focus the selected items`,
								startAdornment: (
									<>
										<SearchRounded />
										{params.slotProps.input.startAdornment}
									</>
								),
							}
						}}
					/>
				)}
			/>
		</StyledStack>
	);
};

export default FilterGames;
