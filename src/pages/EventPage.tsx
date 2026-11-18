import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { theme } from "@/app/theme/theme";
import {
	EventDesktopLayout,
	EventMobileLayout,
	getEventByIdAsync,
	type EventGetResponse,
} from "@/features/event-get";
import Container from "@mui/material/Container";
import BackButton from "@/shared/components/ui/Buttons/BackButton";

export default function EventPage() {
	const nav = useNavigate();
	const { eventId = "" } = useParams();
	const aboveSmallWidth = useMediaQuery(theme.breakpoints.up("md"));

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [data, setData] = useState<EventGetResponse | undefined>(undefined);
	const [prevEventId, setPrevEventId] = useState<string>(eventId);

	if (eventId !== prevEventId) {
		setPrevEventId(eventId);
		setIsLoading(true);
	}

	useEffect(() => {
		async function fetch(routeId: string) {
			await getEventByIdAsync(routeId)
				.then((response) => {
					setData(response);
				})
				.catch((_err) => {
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
			{aboveSmallWidth ?
				<EventDesktopLayout isLoading={isLoading} data={data} />
			:	<EventMobileLayout isLoading={isLoading} data={data}></EventMobileLayout>}
		</Container>
	);
}
