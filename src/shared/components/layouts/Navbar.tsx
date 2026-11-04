import { useState } from 'react';
import { Link as RouterLink, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    Link,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '@/app/auth/useAuth';
import ThemeModeSwitch from '@/app/theme/ThemeModeSwitch';

// the links in the middle when ur logged in
const memberLinks = [
    { to: '/events', label: 'Upptäck' },
    { to: '/calendar', label: 'Kalender' },
    { to: '/my-events', label: 'Mina event' },
];

/**
 * header on every page, changes depending on where u are.
 * login/register: just logo + a link to the other one.
 * logged out: logo + logga in / skapa konto.
 * logged in: logo, nav links, skapa event, theme switch and the avatar menu.
 * on mobile the nav links hide, the bottom nav takes over.
 */
export default function Navbar() {
	const { isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

	const isLoginPage = pathname === '/login';
	const isRegisterPage = pathname === '/register';
	// change this to /events when the upptäck page exists
	const homePath = isAuthenticated ? '/temp' : '/';

	const handleLogout = () => {
		setMenuAnchor(null);
		logout();
		navigate('/login');
	};

	return (
		<AppBar position="static">
			<Toolbar
				sx={{
					gap: { xs: 1.5, md: 3},
					py: 1,
					px: { xs: 2, md: 4},
				}}
			>
				<Box
					component={RouterLink}
					to={homePath}
					sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }}
				>
					<Box component="img" src="/fikaggicon.png" alt="" sx={{ width: 36, height: 36, borderRadius: '8px' }}/>
					<Typography component="span" sx={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>
						fika.gg
					</Typography>
				</Box>

                {isAuthenticated && (
                    <Box component="nav" aria-label="Huvudmeny" sx={{ display: { xs: 'none', md: 'flex' }, gap: 2.5 }}>
                        {memberLinks.map((link) => (
                            <Box
                                key={link.to}
                                component={NavLink}
                                to={link.to}
                                sx={(theme) => ({
                                    color: 'text.secondary',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    py: 0.5,
                                    '&:hover': { color: 'text.primary' },
                                    // NavLink adds the active class + aria-current by itself
                                    '&.active': {
                                        color: 'text.primary',
                                        boxShadow: `inset 0 -2px 0 ${theme.palette.primary.main}`,
                                    },
                                })}
                            >
                                {link.label}
                            </Box>
                        ))}
                    </Box>
                )}

                {/* pushes everything after it to the right */}
                <Box sx={{ flexGrow: 1 }} />

                {isLoginPage && (
                    <Typography sx={{ color: 'text.secondary', fontSize: 15 }}>
                        Ny här?{' '}
                        <Link component={RouterLink} to="/register" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            Skapa ett konto
                        </Link>
                    </Typography>
                )}

                {isRegisterPage && (
                    <Typography sx={{ color: 'text.secondary', fontSize: 15 }}>
                        Har du redan ett konto?{' '}
                        <Link component={RouterLink} to="/login" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            Logga in
                        </Link>
                    </Typography>
                )}

                {!isAuthenticated && !isLoginPage && !isRegisterPage && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            component={RouterLink}
                            to="/login"
                            variant="outlined"
                            sx={(theme) => ({ color: 'text.primary', borderColor: theme.palette.fika.line, borderWidth: 1.5 })}
                        >
                            Logga in
                        </Button>
                        <Button component={RouterLink} to="/register" variant="contained">
                            Skapa konto
                        </Button>
                    </Box>
                )}

                {isAuthenticated && pathname !== '/events/new' && (
                    <Button
                        component={RouterLink}
                        to="/events/new"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        sx={{ display: { xs: 'none', md: 'inline-flex' }, color: 'text.primary', borderColor: 'primary.main', borderWidth: 1.5 }}
                    >
                        Skapa event
                    </Button>
                )}

                <ThemeModeSwitch />

                {isAuthenticated && (
                    <>
                        <IconButton
                            aria-label="Konto"
                            aria-haspopup="menu"
                            aria-expanded={Boolean(menuAnchor)}
                            onClick={(e) => setMenuAnchor(e.currentTarget)}
                            sx={{ p: 0 }}
                        >
                            <Avatar
                                sx={(theme) => ({
                                    width: 44,
                                    height: 44,
                                    bgcolor: theme.palette.fika.fill,
                                    color: 'text.primary',
                                    border: `1.5px solid ${theme.palette.fika.line}`,
                                })}
                            >
                                <PersonIcon />
                            </Avatar>
                        </IconButton>

                        <Menu
                            anchorEl={menuAnchor}
                            open={Boolean(menuAnchor)}
                            onClose={() => setMenuAnchor(null)}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <MenuItem component={RouterLink} to="/profile" onClick={() => setMenuAnchor(null)}>
                                Profil
                            </MenuItem>
                            <MenuItem component={RouterLink} to="/settings" onClick={() => setMenuAnchor(null)}>
                                Inställningar
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Logga ut</MenuItem>
                        </Menu>
                    </>
                )}
			</Toolbar>
		</AppBar>
	);
}