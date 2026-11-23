import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
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
  formatJoinErrorToast,
  formatLeaveErrorToast,
  JoinButton,
  joinEventAsync,
  leaveEventAsync,
} from "@/features/event-join";
import BackButton from "@/shared/components/ui/Buttons/BackButton";
import CopyButton from "@/shared/components/ui/Buttons/CopyButton";
import { Container, Button, Typography, useMediaQuery } from "@mui/material";
import { formatJoinSuccessToast, formatLeaveSuccessToast } from "@/features/event-join/utils/formatToasts";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ConfirmDialog from "@/shared/components/ui/ConfirmDialog";
import { deleteEventAsync } from "@/features/event-delete";

export default function EventPage() {
  const nav = useNavigate();
  const toast = useToast();
  const { user, isAuthenticated } = useAuth();
  const { eventId = "" } = useParams();
  const aboveSmallWidth = useMediaQuery(theme.breakpoints.up("md"));

  // Determines loading of the whole page
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Determines loading of the join button
  const [joinLoading, setJoinLoading] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [data, setData] = useState<EventGetResponse | undefined>(undefined);
  const [prevEventId, setPrevEventId] = useState<string>(eventId);

  if (eventId !== prevEventId) {
    setPrevEventId(eventId);
    setIsLoading(true);
  }

  const handleJoin = useCallback(async () => {
    setJoinLoading(true);
    await joinEventAsync<EventGetResponse>(eventId)
      .then((res) => {
				setData(res.data);
				formatJoinSuccessToast(toast);
			})
      .catch((err) => {
        formatJoinErrorToast(err.response?.status, toast)
      })
      .finally(() => setJoinLoading(false));
  }, [eventId, toast]);

  const handleLeave = useCallback(async () => {
		setJoinLoading(true);
    await leaveEventAsync<EventGetResponse>(eventId)
      .then((res) => {
				setData(res.data);
				formatLeaveSuccessToast(toast);
			})
      .catch((err) => {
				formatLeaveErrorToast(err.response?.status, toast);
      })
      .finally(() => setJoinLoading(false));
  }, [eventId, toast]);

  const handleDelete = useCallback(async () => {
    if (deleteLoading) {
      return;
    }

    setDeleteLoading(true);
    try {
      await deleteEventAsync(eventId);
      toast("Eventet har raderats.", { variant: "success" });
      nav("/discover", { replace: true });
    } catch {
      toast("Det gick inte att radera eventet. Försök igen.", { variant: "error" });
    } finally {
      setDeleteLoading(false);
    }
  }, [deleteLoading, eventId, nav, toast]);

  const joinActions: React.ReactNode = isAuthenticated ? (
    <>
      {data?.host.id !== user?.id && (
        <JoinButton
          isParticipant={data?.players.find((v) => v.userId == user?.id) ? true : false}
          loading={joinLoading}
          onJoin={handleJoin}
          onLeave={handleLeave}
          isFull={data ? (data.participantCount! >= data.maxPlayers! ? true : false) : false}
        />
      )}
      {data?.host.id === user?.id && (
        <>
          <Button
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            onClick={() => nav(`/events/${eventId}/edit`)}
          >
            Redigera event
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={() => setDeleteDialogOpen(true)}
          >
            Radera event
          </Button>
        </>
      )}
      <CopyButton copyText={window.location.href}></CopyButton>
    </>
  ) : (
    <>
      <Typography sx={{
        fontSize: 14,
        color: 'text.secondary',
        textAlign: 'center',
      }}
      >
        Registrera eller logga in för att delta
      </Typography>
      <Button
        component={RouterLink}
        to="/register"
        variant="contained"
      >
        Skapa konto
      </Button>
      <Button
        component={RouterLink}
        to="/login"
        variant="outlined"
      >
        Logga in
      </Button>
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
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Radera eventet?"
        description={`Är du säker på att du vill radera "${data?.title ?? "eventet"}"? Det går inte att ångra.`}
        confirmLabel="Radera event"
        checkboxLabel="Jag förstår att eventet tas bort permanent"
        loading={deleteLoading}
        loadingLabel="Raderar..."
        onConfirm={() => void handleDelete()}
        onClose={() => {
          if (!deleteLoading) {
            setDeleteDialogOpen(false);
          }
        }}
      />
    </Container>
  );
}
