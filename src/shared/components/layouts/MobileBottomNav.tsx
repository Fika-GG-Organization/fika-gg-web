import { Link as RouterLink, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EventIcon from '@mui/icons-material/Event';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '@/app/auth/useAuth';

const tabs = [
    { to: '/events', label: 'Upptäck', icon: <SearchIcon /> },
    { to: '/my-events', label: 'Mina event', icon: <EventIcon /> },
    { to: '/events/new', label: 'Skapa', icon: <AddCircleOutlineOutlinedIcon /> },
    { to: '/profile', label: 'Profil', icon: <PersonIcon /> },
];

/**
 * the 4 tabs stuck to the bottom on phones, replaces the nav links in the header there
 * only shows when ur logged in and the screen is smaller than md
 *
 * used in: Layout
 */
export default function MobileBottomNav() {
    const { isAuthenticated } = useAuth();
    const { pathname } = useLocation();

    if (!isAuthenticated) {
        return null;
    }

    // longest path checked first so /events/new picks skapa and not upptäck
    const current = [...tabs]
        .sort((a, b) => b.to.length - a.to.length)
        .find((tab) => pathname === tab.to || pathname.startsWith(tab.to + '/'))?.to ?? false;

    return (
        <Paper
            component="nav"
            aria-label="Mobilmeny"
            square
            sx={(theme) => ({
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                display: { xs: 'block', md: 'none' },
                borderTop: `1.5px solid ${theme.palette.fika.line}`,
                // room for the iphone home bar
                pb: 'env(safe-area-inset-bottom)',
                zIndex: theme.zIndex.appBar,
            })}
        >
            <BottomNavigation value={current} showLabels sx={{ bgcolor: 'background.paper', height: 64 }}>
                {tabs.map((tab) => (
                    <BottomNavigationAction
                        key={tab.to}
                        value={tab.to}
                        label={tab.label}
                        icon={tab.icon}
                        component={RouterLink}
                        to={tab.to}
                        aria-current={current === tab.to ? 'page' : undefined}
                        sx={{
                            minWidth: 0,
                            color: 'text.secondary',
                            '&.Mui-selected': {
                                color: 'text.primary',
                                fontWeight: 700,
                                '& .MuiSvgIcon-root': { color: 'primary.main' },
                            },
                        }}
                    />
                ))}
            </BottomNavigation>
        </Paper>
    );
}