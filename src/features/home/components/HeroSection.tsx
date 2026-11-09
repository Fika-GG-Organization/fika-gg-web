import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function HeroSection() {
  return (
  	<Box 
			component="section" 
			sx={{
				borderBottom: 1,
				borderColor: 'text.Primary',
			}}
		>
			<Container 
				maxWidth="lg" 
				sx={{ 
					py: {xs: 6, md: 8 },
					display: 'grid',
					gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
					gap: 4,
					alignItems: 'center', 
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2
					}}
				>
					<Typography 
						variant="caption" 
						sx={{ 
							color: 'text.Secondary', 
							textTransform: 'uppercase',
							letterSpacing: 1
						}}
					>
						Gamingkvällar utan kaos i gruppchatten.
					</Typography>
					<Typography
						variant="h1"
						sx={{
							fontSize: { xs: '2.5rem', md: '3.5rem' },
							fontWeight: 800,
							lineHeight: 1.1
						}}
					>
						Hitta ditt gäng till kvällens game
					</Typography>
					<Typography
						sx={{
							color: 'text.Secondary',
							maxWidth: 420
						}}
					>
						Skapa en spelkväll, välj hur många som får vara med och låt folk joina.
						Blir det fullt hamnar resten på reservlistan.
					</Typography>
					<Box sx={{ 
						display: 'flex',
						gap: 1.5, 
						flexWrap: 'wrap',
						mt: 1
					}}>
						<Button
							variant="contained"
							component={RouterLink}
							to="/register"
						>
							Skapa konto gratis
						</Button>
						<Button
							variant="outlined"
							component={RouterLink}
							to="/events"
						>
							Kolla in event
						</Button>
					</Box>
				</Box>
				<Box
					sx={{
						aspectRatio: '4 / 3',
						border: 1,
						borderStyle: 'dashed',
						borderColor: 'text.Secondary',
						borderRadius: 2,
						bgcolor: 'action.hover',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<Typography
						variant="caption"
						sx={{
							color: 'text.Secondary',
							letterSpacing: 1,
						}}
					>
						PLACEHOLDER TEXT HÄR, ERSÄTT MED BILD
					</Typography>
				</Box>
			</Container>
		</Box>
	);
}
