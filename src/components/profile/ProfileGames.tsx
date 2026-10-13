import { Container } from "@mui/material";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ProfileGames() {
  const games = [
    { name: "Chess", gamerTag: "chess123", hoursPlayed: 120 },
    { name: "Monopoly", gamerTag: "monopoly456", hoursPlayed: 80 },
    { name: "Scrabble",},
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
        <h3>Mina Spel</h3>
        <Button variant="outlined" color="primary" startIcon={<AddIcon />}>
          Lägg till spel
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        {games.map((game) => (
          <Box
            key={game.name}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              p: 2,
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
                "& h4, & p": { m: 0 },
                mt:2
              }}
            >
              <h4>{game.name}</h4>
              {game.gamerTag ? <p>{game.gamerTag}</p> : <p> Lägg till gamerTag</p>}
            </Box>

         
          </Box>
        ))}
      </Box>
    </Container>
  );
}
