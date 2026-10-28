import PageContainer from "@mui/material/Container";
import Header from "@/features/event-calendar/ui/Header";
import EventCalendar from "@/features/event-calendar";
import { useTheme } from "@mui/material";

const TEXT_TITLE = "Kalender";
const TEXT_SUBTITLE = "Alla öppna spelkvällar.";

export default function EventCalendarPage() {
	return (
		<PageContainer fixed sx={{ display: "flex", flexDirection: "column" }}>
			<Header title={TEXT_TITLE} subtitle={TEXT_SUBTITLE} />
			<EventCalendar theme={useTheme()}/>
		</PageContainer>
	);
}
