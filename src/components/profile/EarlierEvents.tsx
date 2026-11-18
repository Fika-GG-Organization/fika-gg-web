import { Box, Container, Divider, Link } from "@mui/material";

export default function EarlierEvents() {
  const tidigareEvents = [
    {
      name: "Ranked Grind",
      game: "Valorant",
      date: "2024-06-10",
      time: "18:00",
      role: "Deltagare",
    },
    {
      name: "Chess Duel",
      game: "Chess",
      date: "2024-06-12",
      time: "19:00",
      role: "Värd",
    },
    {
      name: "Monopoly Challenge",
      game: "Monopoly",
      date: "2024-06-14",
      time: "20:00",
      role: "Backup",
    },
  ];

  const visibleEvents = tidigareEvents.slice(0, 3);

  return (
    <Container>
      <h3>Tidigare event</h3>
      <Box sx={{ mt: 4, p: 2, borderRadius: 2, border: 1 }}>
        {visibleEvents.map((event, index) => (
          <Box key={event.name}>
            {index > 0 && <Divider />}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                py: 2,
              }}
            >
              <Box sx={{ textAlign: "right" }}>
                <p>{event.date}</p>
              </Box>
              <Box>
                <h4>{event.name}</h4>
                <p>{event.game}</p>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      {tidigareEvents.length > 3 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Link href="/all-events">Visa fler tidigare event</Link>
        </Box>
      )}
    </Container>
  );
}
