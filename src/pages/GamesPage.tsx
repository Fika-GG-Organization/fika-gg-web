import { Box, Typography } from "@mui/material";
import { GameSearch } from "features/game/components/GameSearch";

export default function GamesPage() {
	return (
		<Box sx={{ maxWidth: 500 }}>
			<Typography variant="h4" gutterBottom>Games</Typography>
			<GameSearch />
		</Box>
	);
}