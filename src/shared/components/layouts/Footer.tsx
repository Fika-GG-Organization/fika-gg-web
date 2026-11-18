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
                py: 3,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
            })}
        >
            <Typography sx={{ fontWeight: 800 }}>fika.gg</Typography>

            <Box component="nav" aria-label="Sidfot" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
                {footerLinks.map((link) => (
                    <Link
                        key={link.to}
                        component={RouterLink}
                        to={link.to}
                        underline="hover"
                        sx={{ color: 'text.secondary', fontSize: 14, '&:hover': { color: 'text.primary' } }}
                    >
                        {link.label}
                    </Link>
                ))}
            </Box>

            <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                © {new Date().getFullYear()} fika.gg
            </Typography>
        </Box>
    );
}