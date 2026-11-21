import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';

const footerLinks = [
    { to: '/about', label: 'Om oss' },
    { to: '/privacy', label: 'Integritet' },
    { to: '/contact', label: 'Kontakt' },
];

/**
 * bottom of every page, logo + a few links + the year
 * integritet will need a real page because of the gdpr stuff (#6)
 *
 * used in: Layout
 */
export default function Footer() {
  return (
    <Box
			component="footer"
			sx={(theme) => ({
				borderTop: `1.5px solid ${theme.palette.fika.line}`,
				bgcolor: 'background.paper',
				px: { xs: 2, md: 4 },
				py: { xs: 1.5, md: 2.5 },
			})}
		>
			<Box
				sx={{
					width: '100%',
					display: 'grid',
					alignItems: 'center',
					columnGap: 2,
					gridTemplateColumns: { xs: '1fr auto', md: '1fr auto 1fr' },
					gridTemplateAreas: {
						xs: `"logo links"
								"copy links"`,
						md: `"logo links copy"`,
					}
				}}
			>
				<Typography
					sx={{
						gridArea: 'logo',
						fontWeight: 800,
						fontSize: { xs: 14, md: 16 } }}
				>
					fika.gg
				</Typography>

				<Box
					component="nav"
					aria-label="Sidfot"
					sx={{
						gridArea: 'links',
						display: 'flex',
						flexWrap: 'wrap',
						gap: { xs: 2.5, md: 4 }}}
				>
					{footerLinks.map((link) => (
						<Link
							key={link.to}
							component={RouterLink}
							to={link.to}
							underline="hover"
							sx={{
								color: 'text.secondary',
								fontSize: {	xs: 14, md: 16 },
								whiteSpace: 'nowrap',
								'&:hover': { color: 'text.primary' }
							}}
						>
							{link.label}
						</Link>
					))}
				</Box>

				<Typography
					sx={{
						gridArea: 'copy',
						justifySelf: { xs: 'start', md: 'end' },
						color: 'text.secondary',
						fontSize: { xs: 11, md: 13 }
					}}
				>
					© {new Date().getFullYear()} fika.gg
				</Typography>
			</Box>
		</Box>
	);
}
