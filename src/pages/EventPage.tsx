import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { theme } from "@/app/theme/theme";
import { EventLayout, getEventByIdAsync, type EventGetResponse } from "@/features/event-get";
import Container from "@mui/material/Container";
import BackButton from "@/shared/components/ui/Buttons/BackButton";

export default function EventPage() {
	const nav = useNavigate();
	const { eventId = "" } = useParams();
	const aboveSmallWidth = useMediaQuery(theme.breakpoints.up("sm"));

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [data, setData] = useState<EventGetResponse | undefined>(undefined);

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
		setIsLoading(true);
		fetch(eventId);
	}, []);

	return (
		<Container component={"main"}>
			<BackButton icon={"left"} underline />
			{aboveSmallWidth ?
				<EventLayout isLoading={isLoading} data={data} />
			:	<></>}
		</Container>
	);
}
