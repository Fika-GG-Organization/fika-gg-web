import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import { useAuth } from '@/app/auth/useAuth';

export default function Layout() {
    const { isAuthenticated } = useAuth();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                // space for the bottom nav so it doesnt cover the footer on phones
                pb: { xs: isAuthenticated ? '80px' : 0, md: 0 },
            }}
        >
            <Navbar />
            <Box sx={{ flexGrow: 1, px: { xs: 2, md: 4 }, py: 3 }}>
                <Outlet />
            </Box>
            <Footer />
            <MobileBottomNav />
        </Box>
    );
}