import { Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function TempPage() {
  const location = useLocation();
	const email = location.state?.email ||"User";

	return (
		<Box>
			<Typography variant="h1">Welcome to Fika GG!</Typography>
			<Typography variant="body1">
				Hello: <strong>{email}</strong>.
			</Typography>
		</Box>
	);
}