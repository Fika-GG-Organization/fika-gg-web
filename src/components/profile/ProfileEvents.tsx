import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Pill from "../Pill";

export default function ProfileEvents() {
  const events = [
    {
      name: "Chess Duel",
      game: "chess",
      time: " 18:00",
      date: "2024-06-15",
      role: "Värd",
    },
    {
      name: "Monopoly Challenge",
      game: "monopoly",
      time: " 19:00",
      date: "2024-06-16",
      role: "Deltagare",
    },
    {
      name: "Scrabble Challenge",
      game: "scrabble",
      time: " 20:00",
      date: "2024-06-17",
      role: "Backup ",
    },
  ];

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          mt: 4,
        }}
      >
        <h3>Uppkommande Event</h3>
        <Link
          to="/all-events"
          style={{ color: "black", textDecoration: "underline" }}
        >
          Visa alla event
        </Link>
      </Box>
      <Box sx={{ mt: 2 }}>
        {events.map((event) => (
          <Box
            key={event.name}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              p: 2,
              height: 86,
              boxSizing: "border-box",
              mt: 2,
              border: "1px solid grey",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                backgroundColor: "grey",
                border: "1px solid black",
              }}
            ></Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                "& h4, & h5, & p": { m: 0 },
              }}
            >
              <h4>{event.name}</h4>
              <h5>{event.game}</h5>
              <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <p>{event.date}</p>
                <p>{event.time}</p>
              </Box>
            </Box>
            <Pill text={event.role} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
