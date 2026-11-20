import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { theme } from "@/app/theme/theme";
import { useAuth } from "@/app/auth/useAuth";
import { useToast } from "@/app/toast";
import {
	EventDesktopLayout,
  EventMobileLayout,
  getEventByIdAsync,
  type EventGetResponse,
} from "@/features/event-get";
import {
	formatAlreadyJoinedErrorToast,
	formatErrorToast,
  JoinButton,
  joinEventAsync,
  leaveEventAsync,
} from "@/features/event-join";
import BackButton from "@/shared/components/ui/Buttons/BackButton";
import CopyButton from "@/shared/components/ui/Buttons/CopyButton";
import { useMediaQuery } from "@mui/material";
import Container from "@mui/material/Container";

export default function EventPage() {
  const nav = useNavigate();
  const toast = useToast();
  const { user } = useAuth();
  const { eventId = "" } = useParams();
  const aboveSmallWidth = useMediaQuery(theme.breakpoints.up("md"));

  // Determines loading of the whole page
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Determines loading of the join button
  const [joinLoading, setJoinLoading] = useState<boolean>(false);
  const [data, setData] = useState<EventGetResponse | undefined>(undefined);
  const [prevEventId, setPrevEventId] = useState<string>(eventId);

  if (eventId !== prevEventId) {
    setPrevEventId(eventId);
    setIsLoading(true);
  }

  const handleJoin = useCallback(async () => {
    setJoinLoading(true);
    await joinEventAsync<EventGetResponse>(eventId)
      .then((res) => setData(res.data))
      .catch((err) => {
        switch (err.response?.status) {
          case 400:
            formatAlreadyJoinedErrorToast(toast);
            break;
          default:
            formatErrorToast(toast);
            break;
        }
      })
      .finally(() => setJoinLoading(false));
  }, [joinLoading, eventId]);

  const handleLeave = useCallback(async () => {
		setJoinLoading(true);
    await leaveEventAsync<EventGetResponse>(eventId)
      .then((res) => setData(res.data))
      .catch((_err) => {
				formatErrorToast(toast);
      })
      .finally(() => setJoinLoading(false));
  }, [joinLoading, eventId]);

  const joinActions: React.ReactNode = (
    <>
      <JoinButton
        isParticipant={data?.players.find((v) => v.userId == user?.id) ? true : false}
        loading={joinLoading}
				onJoin={handleJoin}
				onLeave={handleLeave}
      />
      <CopyButton copyText={window.location.href}></CopyButton>
    </>
  );

  useEffect(() => {
    async function fetch(routeId: string) {
      await getEventByIdAsync(routeId)
        .then((response) => {
          setData(response);
        })
        .catch(() => {
          nav("/error", { replace: true });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    fetch(eventId);
  }, [eventId, nav]);

  return (
    <Container component={"main"}>
      <BackButton icon={"left"} underline />
      {aboveSmallWidth ? (
        <EventDesktopLayout isLoading={isLoading} data={data} actions={joinActions} />
      ) : (
        <EventMobileLayout isLoading={isLoading} data={data} actions={joinActions} />
      )}
    </Container>
  );
}
