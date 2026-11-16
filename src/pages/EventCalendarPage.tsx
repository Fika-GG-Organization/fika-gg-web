import Container from "@mui/material/Container";
import PageHeader from "@/shared/components/ui/PageHeader";
import EventCalendar from "@/features/event-calendar";

const TEXT_TITLE = "Kalender";
const TEXT_DESC = "Alla öppna spelkvällar";

export default function EventCalendarPage() {
	return (
		<Container>
			<PageHeader 
				title={TEXT_TITLE} 
				description={TEXT_DESC}
			/>
			<EventCalendar />
		</Container>
	);
};
