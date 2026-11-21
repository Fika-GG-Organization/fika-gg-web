import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';
import { useAuth } from '@/app/auth/useAuth';

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
	const { isAuthenticated } = useAuth();

  return (
    <Box
			component="footer"
			sx={(theme) => ({
				position: isAuthenticated ? 'static' : 'sticky',
				bottom: 0,
				zindex: theme.zIndex.appBar,
				borderTop: `1.5px solid ${theme.palette.fika.line}`,
				bgcolor: 'background.paper',
				px: { xs: 2, md: 4 },
				py: { xs: 1, md: 2 },
				display: 'flex',
				flexWrap: 'wrap',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: 2,
			})}
		>
			{/* logo & year, left side on desktop, top on mobile */}
			<Box sx={{ lineHeight: 1.2 }}>
				<Typography
					sx={{
						fontWeight: 800,
						fontSize: { xs: 14, md: 14 } }}
				>
					fika.gg
				</Typography>
				<Typography
					sx={{
						color: 'text.secondary',
						fontSize: { xs: 11, md: 14 }
					}}
				>
					© {new Date().getFullYear()} fika.gg
				</Typography>
			</Box>

			<Box component="nav" aria-label="Sidfot" sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.5, md: 2.5 }}}>
				{footerLinks.map((link) => (
					<Link
						key={link.to}
						component={RouterLink}
						to={link.to}
						underline="hover"
						sx={{
							color: 'text.secondary',
							fontSize: {	xs: 12, md: 14 },
							whiteSpace: 'nowrap',
							'&:hover': { color: 'text.primary' }
						}}
					>
						{link.label}
					</Link>
				))}
			</Box>
		</Box>
	);
}
