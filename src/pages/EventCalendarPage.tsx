import PageContainer from "@mui/material/Container";
import Header from "@/features/event-calendar/ui/Header";
import EventCalendar from "@/features/event-calendar";

const TEXT_TITLE = "Kalender";
const TEXT_SUBTITLE = "Alla öppna spelkvällar.";

export default function EventCalendarPage() {
	return (
		<PageContainer fixed sx={{ display: "flex", flexDirection: "column" }}>
			<Header title={TEXT_TITLE} subtitle={TEXT_SUBTITLE} />
			<EventCalendar/>
		</PageContainer>
	);
}
