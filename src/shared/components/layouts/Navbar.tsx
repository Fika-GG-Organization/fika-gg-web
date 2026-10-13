import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function Navbar() {
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/signup";
  const isHomePage = location.pathname === "/";

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ffffff" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {isHomePage ? (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "#000000", fontWeight: "bold" }}
            >
              Fika.gg
            </Typography>
            <Typography
              variant="subtitle2"
              component="div"
              sx={{ color: "#000000" }}
            >
              Så funkar det
            </Typography>
            <Typography
              variant="subtitle2"
              component="h6"
              sx={{ color: "#000000" }}
            >
              Hitta Event
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              variant="subtitle2"
              component="h6"
              sx={{ color: "#000000" }}
            >
              Fika.gg
            </Typography>
          </Box>
        )}

        {isHomePage ? (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="outlined" color="primary" href="/login">
              Logga in
            </Button>
            <Button variant="contained" color="secondary" href="/signup">
              Registrera Konto
            </Button>
          </Box>
        ) : isLoginPage ? (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              variant="subtitle2"
              component="h6"
              sx={{ color: "#000000" }}
            >
              Har du inget konto? <a href="/signup">Registrera dig här</a>
            </Typography>
          </Box>
        ) : isRegisterPage ? (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              variant="subtitle2"
              component="h6"
              sx={{ color: "#000000" }}
            >
              Har du redan ett konto? <a href="/login">Logga in här</a>
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              href="/newEvent"
              startIcon={<AddIcon />}
            >
              Skapa Event
            </Button>
            <Link to="/profile">
              <Avatar variant="rounded" alt="User Avatar" />
            </Link>
           
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
