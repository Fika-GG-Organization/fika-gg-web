import { 
	AppBar, 
	Toolbar, 
	Typography,
	Box,
	Button
} from '@mui/material';
import { useAuth } from '../../../app/auth/useAuth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

	const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const homePath = isAuthenticated ? "/temp" : "/";

	return (
		<AppBar 
			position="static"
			elevation={0}
		>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
				
			>
				<Typography 
					variant="h4"
					component={RouterLink}
					to={homePath}
					sx={{
						textDecoration: "none",
						color: "inherit",
						fontWeight: "bold",
					}}
				>
					Fika GG
				</Typography>
				<Box
					sx={{
						display: { xs: "none", sm: "flex",
					},
					gap: 1}}	
				>
					{isAuthenticated ? (
						<Button onClick={handleLogout} color="inherit" size="small">
							Log Out
						</Button>
					) : (
						<>
							<Button
								component={RouterLink}
								to="/login"
								color="inherit"
								size="small"
							>
								Log In
							</Button>
							<Button
								component={RouterLink}
								to="/register"
								color="inherit"
								size="small"
							>
								Register
							</Button>
						</>
					)}				

				</Box>
			</Toolbar>
		</AppBar>
	);
}