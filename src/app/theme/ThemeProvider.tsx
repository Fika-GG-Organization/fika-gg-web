import { type ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';

export const AppProvider = ({ children }: { children: ReactNode}) => {
  return (
    <ThemeProvider theme={theme} defaultMode='dark'>
      <CssBaseline enableColorScheme/>
      {children}
    </ThemeProvider>
  );
};