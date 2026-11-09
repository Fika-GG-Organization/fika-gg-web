import {
    Box,
    Container,
    Typography
} from '@mui/material';

const steps = [
  {
		title: 'Lägg till dina spel', 
		text: 'Välj spelen du kör och lägg in din gamertag, så vet folk vem de ska adda.'
	},
	{
		title: 'Skapa eller hitta ett event',
		text: 'Välj spel, tid och max antal spelare. Eller vad andra har skapat.'
	},
	{
		title: 'Joina, eller bli reserv',
		text: 'Ta en ledig plats. Är det fullt kan du bli reserv och få platsen om någon hoppar av.'
	}
];

export default function HowItWorksSection() {
	return (
		<Box 
			component="section"
			sx={{ 
				borderBottom: 1, 
				borderColor: 'text.Primary' 
			}}
		>
			<Container
				maxWidth="lg"
				sx={{
					py: { xs: 5, md: 7 }
				}}
			>
				<Typography
					variant="h2"
					sx={{
						fontSize: { xs: '2rem', md: '2.5rem' },
						fontWeight: 700,
						mb: 3
					}}
				>
					Så funkar det
				</Typography>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { 
						xs: '1fr',
						md: 'repeat(3, 1fr)'},
						gap: 2
					}}
				>
					{steps.map((step, index) => (
						<Box
							key={index}
							sx={{
								border: 1, borderColor: 'text.Primary',
								borderRadius: 2,
								p: 3,
								bgcolor: 'background.paper'
							}}
						>
							<Box
								sx={{
									width: 32,
									height: 32,
									borderRadius: '50%',
									border: 1,
									borderColor: 'text.Primary',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									mb: 2
								}}
							>
								<Typography variant="body2">
									{index + 1}
								</Typography>
							</Box>
							<Typography
								sx={{
									fontWeight: 700,
									mb: 1
								}}
							>
								{step.title}
							</Typography>
							<Typography 
								variant="body2"
								sx={{ color: 'text.Secondary' }}
							>
								{step.text}
							</Typography>
						</Box>
					))}
				</Box>
			</Container>
		</Box>
	);
}