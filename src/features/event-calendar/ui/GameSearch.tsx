import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/SearchRounded";

const placeHolder = "Sök...";

const GameSearch = () => {
	return (
		<>
			<FormControl component={"search"} >
				<OutlinedInput
					id="search"
					size={"small"}
					placeholder={`${placeHolder}`}
					sx={{ display:"flex", flexGrow: 5 }}
					inputProps={{ "aria-label": "search" }}
					startAdornment={
						<InputAdornment position="start" >
							<SearchIcon />
						</InputAdornment>
					}
				/>
			</FormControl>
		</>
	);
};

export default GameSearch;

