import {
  JOIN_PANEL_DESCRIPTION,
  LABEL_DESCRIPTION,
  PLACEHOLDER_DESCRIPTION,
  PLACEHOLDER_LABEL,
} from "../config/constants";
import type { EventLayoutProps } from "../models";
import { formatParticipantList } from "../utils/formatParticipantList";
import { formatJoinPanelHeadline } from "../utils/formatJoinPanelHeadline";
import { theme } from "@/app/theme/theme";
import { formatEventTime2 } from "@/shared/utils/formatEventTime";
import HostCard from "@/shared/components/ui/HostCard";
import JoinPanel from "@/shared/components/ui/JoinPanel";
import GameBanner from "@/shared/components/ui/GameBanner";
import PageHeader from "@/shared/components/ui/PageHeader";
import ParticipantList from "@/shared/components/ui/ParticipantList";
import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

/** Desktop layout for the event page. Includes a skeleton that shows the basic component structure while it is loading data. */
const EventDesktopLayout = ({ data, actions, ...props }: EventLayoutProps) => {
  const greaterThanLargeWith = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Stack direction={"column"}>
      {props.isLoading && (
        <Grid container rowSpacing={4} columnSpacing={4}>
          <Grid size={12}>
            <Skeleton variant={"rectangular"}>
              <GameBanner name={PLACEHOLDER_LABEL} />
            </Skeleton>
          </Grid>
          <Grid size={8}>
            <Stack spacing={2.5}>
              <Skeleton variant={"text"}>
                <PageHeader title={PLACEHOLDER_LABEL} />
              </Skeleton>
              <Skeleton variant={"rounded"}>
                <HostCard name={PLACEHOLDER_LABEL} />
              </Skeleton>
              <Stack>
                <Skeleton variant={"text"}>
                  <Typography component="h2">{LABEL_DESCRIPTION}</Typography>
                </Skeleton>
                <Skeleton variant={"text"}>
                  <Typography variant={"body1"}>{PLACEHOLDER_DESCRIPTION}</Typography>
                </Skeleton>
              </Stack>
            </Stack>
          </Grid>
          <Grid size={4}>
            <Skeleton variant={"rectangular"}>
              <JoinPanel headline={PLACEHOLDER_LABEL} joined={0} max={0} />
            </Skeleton>
          </Grid>
        </Grid>
      )}
      {!props.isLoading && (
        <Grid container rowSpacing={4} columnSpacing={4}>
          <Grid size={12}>
            <GameBanner
              name={data?.game?.name ?? PLACEHOLDER_LABEL}
              coverUrl={data?.game?.coverUrl}
              variant={"detail"}
              fill={false}
            />
          </Grid>
          <Grid size={greaterThanLargeWith ? 8 : 7}>
            <Stack spacing={2.5}>
              <PageHeader
                title={data?.title ?? PLACEHOLDER_LABEL}
                description={data ? formatEventTime2(data.startTime, data.endTime) : undefined}
              />
              <HostCard
                name={data?.host.displayName ?? PLACEHOLDER_LABEL}
                avatarUrl={data?.host.avatarUrl}
              />
              <Stack>
                <Typography component="h2" sx={{ fontSize: 22, fontWeight: 700 }}>
                  {LABEL_DESCRIPTION}
                </Typography>
                <Typography variant={"body1"}>
                  {data?.description ?? PLACEHOLDER_DESCRIPTION}
                </Typography>
              </Stack>
              <ParticipantList max={data?.maxPlayers ?? 0} players={formatParticipantList(data)} />
            </Stack>
          </Grid>
          <Grid size={greaterThanLargeWith ? 4 : 5}>
            <JoinPanel
              headline={formatJoinPanelHeadline(data?.participantCount, data?.maxPlayers)}
              message={JOIN_PANEL_DESCRIPTION}
              joined={data?.participantCount ?? 0}
              max={data?.maxPlayers ?? 0}
            >
              {actions}
            </JoinPanel>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};

export default EventDesktopLayout;
