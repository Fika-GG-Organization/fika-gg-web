import { styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardActionsArea from "@mui/material/CardActionArea";
import type { EventCalendarResponseItem } from "../models/event-calendar.types";
import { Typography } from "@mui/material";

const DEFAULT_EVENT_COVER_URL = "";

interface CalendarCardProps {
	data: EventCalendarResponseItem;
}

const StyledCard = styled(Card)(({theme}) => ({

}));

const CalendarCard = (props: EventCalendarResponseItem) => {
	return (
		<Card key={props.id} variant={"outlined"} raised>
			<CardMedia image={props.coverUrl ?? DEFAULT_EVENT_COVER_URL} />
			<CardHeader title={props.title} />
			<CardContent>
				<Typography variant={"body2"}>{props.description}</Typography>
				<Typography variant={"body1"}>
					{props.attendees ?? "?"}
					{"/"}
					{props.maxAttendees ?? "?"}
				</Typography>
			</CardContent>
			<CardActionsArea>
				<CardActions />
			</CardActionsArea>
		</Card>
	);
};

export default CalendarCard;
