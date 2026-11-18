import { Avatar, Box, Button } from "@mui/material";
import PenIcon from "@mui/icons-material/Edit";

export default function ProfileCard() {
  const user = {
    name: "John Doe",
    memberSince: "sep 2026",
    joinedEvents: 5,
    hostedEvents: 3,
    gamesOwned: 10,
  };

  return (
    <>
      <Box
        sx={{
          p: 2,
          border: "1px solid grey",
          borderRadius: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar sx={{ width: 100, height: 100, border: "1px solid black" }}>JD</Avatar>
        <Box>
          <h2>{user.name}</h2>

          <p> Medlem sedan {user.memberSince}</p>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <p> {user.joinedEvents} event du varit på</p>
            <p> {user.hostedEvents} som värd</p>
            <p> {user.gamesOwned} spel</p>
          </Box>
        </Box>
        <Button
          sx={{ ml: "auto", flexShrink: 0 }}
          variant="outlined"
          color="primary"
          startIcon={<PenIcon />}
          href="/user-settings"
        >
          Redigera profil
        </Button>
      </Box>
    </>
  );
}
