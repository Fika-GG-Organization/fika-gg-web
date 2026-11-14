import type { EventLayoutProps } from "../models";
import { formatEventTime2 } from "@/shared/utils/formatEventTime";
import { theme } from "@/app/theme/theme";
import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import HostCard from "@/shared/components/ui/HostCard";
import JoinPanel from "@/shared/components/ui/JoinPanel";
import GameBanner from "@/shared/components/ui/GameBanner";
import PageHeader from "@/shared/components/ui/PageHeader";
import CopyButton from "@/shared/components/ui/Buttons/CopyButton";
import ParticipantList, { type ListPlayer } from "@/shared/components/ui/ParticipantList";

const LABEL_PLACEHOLDER = "Placeholder";
const LABEL_JOIN = "Joina";
const LABEL_LINK = "Kopiera inbjudan";
const LABEL_DESCRIPTION = "Om eventet";
const PLACEHOLDER_DESC =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const PLACEHOLDER_JOIN_DESC =
	"Joina för att säkra din plats. Du kan hoppa av när som helst innan det börjar. Du kan joina som backup när det är fullt.";
const LABEL_FULL_PARTY = "Fullt";
const LABEL_AVAILABLE_PARTY = "platser kvar";

/** Desktop layout for the event page. Includes a skeleton that shows the basic component structure while it is loading data. */
const EventDesktopLayout = ({ data, ...props }: EventLayoutProps) => {
	const greaterThanLargeWith = useMediaQuery(theme.breakpoints.up("lg"));

	return (
		<Stack direction={"column"}>
			{props.isLoading && (
				<Grid container rowSpacing={4} columnSpacing={4}>
					<Grid size={12}>
						<Skeleton variant={"rectangular"}>
							<GameBanner name={LABEL_PLACEHOLDER} fill={true} />
						</Skeleton>
					</Grid>
					<Grid size={8}>
						<Stack spacing={2.5}>
							<Skeleton variant={"text"}>
								<PageHeader title={LABEL_PLACEHOLDER} />
							</Skeleton>
							<Skeleton variant={"rounded"}>
								<HostCard name={LABEL_PLACEHOLDER} />
							</Skeleton>
							<Stack>
								<Skeleton variant={"text"}>
									<Typography component="h2">{LABEL_DESCRIPTION}</Typography>
								</Skeleton>
								<Skeleton variant={"text"}>
									<Typography variant={"body1"}>{PLACEHOLDER_DESC}</Typography>
								</Skeleton>
							</Stack>
						</Stack>
					</Grid>
					<Grid size={4}>
						<Skeleton variant={"rectangular"}>
							<JoinPanel headline={LABEL_PLACEHOLDER} joined={0} max={0} />
						</Skeleton>
					</Grid>
				</Grid>
			)}
			{!props.isLoading && (
				<Grid container rowSpacing={4} columnSpacing={4}>
					<Grid size={12}>
						<GameBanner
							name={data?.game?.name ?? LABEL_PLACEHOLDER}
							coverUrl={data?.game?.coverUrl}
							variant={"detail"}
							fill={false}
						/>
					</Grid>
					<Grid size={greaterThanLargeWith ? 8 : 7}>
						<Stack spacing={2.5}>
							<PageHeader
								title={data?.title ?? LABEL_PLACEHOLDER}
								description={
									data !== null && data !== undefined ?
										formatEventTime2(data.startTime, data.endTime)
									:	undefined
								}
							/>
							<HostCard name={LABEL_PLACEHOLDER} />
							<Stack>
								<Typography component="h2" sx={{ fontSize: 22, fontWeight: 700 }}>
									{LABEL_DESCRIPTION}
								</Typography>
								<Typography variant={"body1"}>{data?.description}</Typography>
							</Stack>
							<ParticipantList
								max={data!.maxPlayers ?? 0}
								players={data!.players.map((p): ListPlayer => {
									return {
										id: p.userId,
										name: p.displayName,
										avatarUrl: p.avatarUrl,
										note: data!.hostId === p.userId ? "Värd" : "Spelare",
									};
								})}
							/>
						</Stack>
					</Grid>
					<Grid size={greaterThanLargeWith ? 4 : 5}>
						<JoinPanel
							headline={
								data!.participantCount! <= data!.maxPlayers! ?
									`${data!.maxPlayers! - data!.participantCount!} ${LABEL_AVAILABLE_PARTY}`
								:	LABEL_FULL_PARTY
							}
							message={PLACEHOLDER_JOIN_DESC}
							joined={data!.participantCount ?? 0}
							max={data!.maxPlayers ?? 0}
						>
							<Button variant={"contained"}>{LABEL_JOIN}</Button>
							<CopyButton copyText={"https://wikipedia.com"}>{LABEL_LINK}</CopyButton>
						</JoinPanel>
					</Grid>
				</Grid>
			)}
		</Stack>
	);
};

export default EventDesktopLayout;
