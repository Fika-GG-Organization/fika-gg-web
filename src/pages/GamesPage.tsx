import { Box, Typography, Grid, Skeleton } from "@mui/material";
import { GameSearch } from "features/game/components/GameSearch";
import { useEffect, useState } from "react";
import { getUserData } from "@/features/user/api/userApi";
import type { OwnedGame } from "@/features/user/types/UserResponse";
import EditGameDialog from "@/features/user/components/EditGameDialog";
import PageHeader from "@/shared/components/ui/PageHeader";
import UserGameList from "@/shared/components/ui/UserGameList";

export default function GamesPage() {
	const [games, setGames] = useState<OwnedGame[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [editingGame, setEditingGame] = useState<OwnedGame | null>(null);
	const [reloadKey, setReloadKey] = useState(0); // bump this to refetch the profile after editing a game

	useEffect(() => {
		getUserData()
			.then((res) => setGames(res.ownedGames))
			.catch(() => setGames([]))
			.finally(() => setIsLoading(false));
	}, [reloadKey]);

	const reload = () => setReloadKey((k) => k + 1);

	return (
		<Box
			sx={{
				maxWidth: 1120,
				mx: "auto"
			}}>
				<PageHeader
					centered
					title="Mina spel"
					description="Lägg till spelen du spelar, så visar vi event du kan delta i."
				/>
					{/* Left column: Game search */}
					<Grid container spacing={4}>
						<Grid size={{ xs: 12, md: 6 }}>
							<Typography
								component="h2"
								sx={{
									fontSize: 22,
									fontWeight: 700,
									mb: 2
								}}
							>
								Lägg till spel
							</Typography>
							<GameSearch onAdded={reload} />
						</Grid>

						{/* Right column: User games */}
						<Grid size={{ xs: 12, md: 6 }}>
							{isLoading ? (
								<Skeleton variant="rounded" height={240} />
							) : (
								<UserGameList
									title="Dina spel"
									emptyText="Inga spel än. Sök efter ett spel och lägg till det."
									games={games.map((g) => ({
										id: g.gameId,
										name: g.name,
										coverUrl: g.coverUrl,
										gamerTag: g.gamerTag,
									}))}
									onEdit={(id) => setEditingGame(games.find((g) => g.gameId === id) ?? null)}
								/>
							)}
						</Grid>
					</Grid>

					{editingGame && (
						<EditGameDialog
							game={editingGame}
							onClose={() => setEditingGame(null)}
							onSaved={reload}
						/>
					)}
		</Box>
	);
}
