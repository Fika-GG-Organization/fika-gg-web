import { AppBar, Toolbar, Typography } from '@mui/material';
//import { useAuth } from '../../../auth/useAuth';

export default function Navbar() {
  //const { isAuthenticated, logout } = useAuth();

	return (
		<AppBar 
			position="static"
			elevation={0}
		>
			<Toolbar>
				<Typography 
					variant="h4"
					component="h3"
				>
					Fika GG
				</Typography>
			</Toolbar>
		</AppBar>
	);
}