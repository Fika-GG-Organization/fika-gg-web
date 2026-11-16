import type { EventLayoutProps } from "../models";
import { formatEventTime2 } from "@/shared/utils/formatEventTime";
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
const LABEL_DESCRIPTION = "Om eventet";
const PLACEHOLDER_JOIN_DESC =
	"Joina för att säkra din plats. Du kan hoppa av när som helst innan det börjar. Du kan joina som backup när det är fullt.";
const LABEL_FULL_PARTY = "Fullt";
const LABEL_AVAILABLE_PARTY = "platser kvar";

const EventMobileLayout = ({ data, ...props }: EventLayoutProps) => {
	return (
		<Stack direction={"column"}>
			{props.isLoading && (
				<Stack direction={"column"} spacing={1.5}>
					<Skeleton variant={"rectangular"}>
						<GameBanner name={LABEL_PLACEHOLDER} fill={true} />
					</Skeleton>
					<Skeleton variant={"text"}>
						<Typography variant={"subtitle1"}>
							{data?.game?.name ?? LABEL_PLACEHOLDER}
						</Typography>
					</Skeleton>
					<Skeleton variant={"text"}>
						<PageHeader title={LABEL_PLACEHOLDER} />
					</Skeleton>
					<Skeleton>
						<HostCard name={LABEL_PLACEHOLDER} />
					</Skeleton>
					<Skeleton variant={"text"}>
						<Stack sx={{ paddingY: 1 }}>
						<Typography component="h2" sx={{ fontSize: 16, fontWeight: 700 }}>
							{LABEL_DESCRIPTION}
						</Typography>
						<Typography variant={"body1"}>{LABEL_PLACEHOLDER}</Typography>
					</Stack>
					</Skeleton>
				</Stack>
			)}
			{!props.isLoading && (
				<Stack direction={"column"} spacing={1.5}>
					<GameBanner
						name={data?.game?.name ?? LABEL_PLACEHOLDER}
						coverUrl={data?.game?.coverUrl}
						variant={"detail"}
						fill={false}
					/>
					<Typography variant={"subtitle1"}>
						{data?.game?.name ?? LABEL_PLACEHOLDER}
					</Typography>
					<PageHeader
						title={data?.title ?? LABEL_PLACEHOLDER}
						description={
							data !== null && data !== undefined ?
								formatEventTime2(data.startTime, data.endTime)
							:	undefined
						}
					/>
					<HostCard name={LABEL_PLACEHOLDER} />
					<Stack sx={{ paddingY: 1 }}>
						<Typography component="h2" sx={{ fontSize: 16, fontWeight: 700 }}>
							{LABEL_DESCRIPTION}
						</Typography>
						<Typography variant={"body1"}>{data?.description}</Typography>
					</Stack>
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
						<CopyButton></CopyButton>
					</JoinPanel>
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
			)}
		</Stack>
	);
};

export default EventMobileLayout;
