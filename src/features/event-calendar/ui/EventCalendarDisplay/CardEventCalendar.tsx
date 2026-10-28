import type { EventCalendarResponseItem } from "../../models";
import { styled } from "@mui/material";
import Card, {type CardProps} from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardActionsArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";

interface CardEventCalendarProps extends CardProps {
	data: EventCalendarResponseItem;
	defaultCoverUrl: string;
}

const StyledCard = styled(Card)(({theme}) => ({

}));

/**
 * A card that will contain event info on the calendar page.
 * @param param0 
 */
const CardEventCalendar = ({data, ...props}: CardEventCalendarProps) => {
	return (
		<Card {...props} key={data.id} variant={"outlined"} raised >
			<CardMedia 
				image={data.coverUrl ?? props.defaultCoverUrl} 
				sx={{ height: "100%" }}
			/>
			<CardHeader title={data.title} />
			<CardContent>
				<Typography variant={"body2"}>{data.description}</Typography>
				<Typography variant={"body1"}>
					{data.attendees ?? "?"}
					{"/"}
					{data.maxAttendees ?? "?"}
				</Typography>
			</CardContent>
			<CardActionsArea>
				<CardActions />
			</CardActionsArea>
		</Card>
	);
};

export default CardEventCalendar;
