import {
	JOIN_PANEL_DESCRIPTION,
	LABEL_DESCRIPTION,
	PLACEHOLDER_DESCRIPTION,
	PLACEHOLDER_LABEL } from "../config/constants";
import type { EventLayoutProps } from "../models";
import { formatJoinPanelHeadline } from "../utils/formatJoinPanelHeadline";
import { formatParticipantList } from "../utils/formatParticipantList";
import { formatEventTime2 } from "@/shared/utils/formatEventTime";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import HostCard from "@/shared/components/ui/HostCard";
import JoinPanel from "@/shared/components/ui/JoinPanel";
import GameBanner from "@/shared/components/ui/GameBanner";
import PageHeader from "@/shared/components/ui/PageHeader";
import ParticipantList from "@/shared/components/ui/ParticipantList";

const EventMobileLayout = ({ data, actions: joinActions, ...props }: EventLayoutProps) => {
  return (
    <Stack direction={"column"}>
      {props.isLoading && (
        <Stack direction={"column"} spacing={1.5}>
          <Skeleton variant={"rectangular"}>
            <GameBanner name={PLACEHOLDER_LABEL} fill={true} />
          </Skeleton>
          <Skeleton variant={"text"}>
            <Typography variant={"subtitle1"}>{data?.game?.name ?? PLACEHOLDER_LABEL}</Typography>
          </Skeleton>
          <Skeleton variant={"text"}>
            <PageHeader title={PLACEHOLDER_LABEL} />
          </Skeleton>
          <Skeleton>
            <HostCard name={PLACEHOLDER_LABEL} />
          </Skeleton>
          <Skeleton variant={"text"}>
            <Stack sx={{ paddingY: 1 }}>
              <Typography component="h2" sx={{ fontSize: 16, fontWeight: 700 }}>
                {LABEL_DESCRIPTION}
              </Typography>
              <Typography variant={"body1"}>{PLACEHOLDER_DESCRIPTION}</Typography>
            </Stack>
          </Skeleton>
        </Stack>
      )}
      {!props.isLoading && (
        <Stack direction={"column"} spacing={1.5}>
          <GameBanner
            name={data?.game?.name ?? PLACEHOLDER_LABEL}
            coverUrl={data?.game?.coverUrl}
            variant={"detail"}
            fill={false}
          />
          <Typography variant={"subtitle1"}>{data?.game?.name ?? PLACEHOLDER_LABEL}</Typography>
          <PageHeader
            title={data?.title ?? PLACEHOLDER_LABEL}
            description={data ? formatEventTime2(data.startTime, data.endTime) : undefined}
          />
          <HostCard
            name={data?.host.displayName ?? PLACEHOLDER_LABEL}
            avatarUrl={data?.host.avatarUrl}
          />
          <Stack sx={{ paddingY: 1 }}>
            <Typography component="h2" sx={{ fontSize: 16, fontWeight: 700 }}>
              {LABEL_DESCRIPTION}
            </Typography>
            <Typography variant={"body1"}>{data?.description ?? PLACEHOLDER_DESCRIPTION}</Typography>
          </Stack>
          <JoinPanel
            headline={formatJoinPanelHeadline(data?.participantCount, data?.maxPlayers)}
            message={JOIN_PANEL_DESCRIPTION}
            joined={data?.participantCount ?? 0}
            max={data?.maxPlayers ?? 0}
          >
            {joinActions}
          </JoinPanel>
          <ParticipantList max={data?.maxPlayers ?? 0} players={formatParticipantList(data)} />
        </Stack>
      )}
    </Stack>
  );
};

export default EventMobileLayout;
