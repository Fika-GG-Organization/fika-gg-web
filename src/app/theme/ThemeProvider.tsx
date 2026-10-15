import { type ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { AuthProvider } from '../auth/AuthProvider';

export const AppProvider = ({ children }: { children: ReactNode}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
};