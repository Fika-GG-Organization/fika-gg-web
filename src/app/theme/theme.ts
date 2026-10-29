// CSS Code for MUI Theme later

import { createTheme } from '@mui/material/styles';

type FikaTokens = {
  line: string;
  fill: string;
  chipOn: string;
  fieldLine: string;
  cover: string;
}

declare module '@mui/material/styles' {
  interface Palette { fika: FikaTokens }
  interface PaletteOptions { fika?: FikaTokens }
}

export const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: { default: '#1A1210', paper: '#241815' },
        text: { primary: '#F3E9DC', secondary: '#BBA894' },
        primary: { main: '#E4513F', contrastText: '#1A1210' },
        secondary: { main: '#D9A63C', contrastText: '#1A1210' },
        divider: '#3A2724',
        fika: {
          line: '#4E3530',
          fill: '#2E1F1B',
          chipOn: '#3A2420',
          fieldLine: '#88665B',
          cover: 'repeating-linear-gradient(135deg,#E4513F10 0 2px,transparent 2px 13px),linear-gradient(100deg,#3B1A15,#241815 72%)',
        },
      },
    },
    light: {
      palette: {
        background: { default: '#F6EFE4', paper: '#FFFAF2' },
        text: { primary: '#2B1D14', secondary: '#6B5444' },
        primary: { main: '#B23A2A', contrastText: '#FFFAF2' },
        secondary: { main: '#8A5A12', contrastText: '#FFFAF2' },
        divider: '#E2D5C3',
        fika: {
          line: '#2B1D14',
          fill: '#EADFCF',
          chipOn: '#F3DCD6',
          fieldLine: '#9C8471',
          cover: 'repeating-linear-gradient(135deg,#B23A2A12 0 2px,transparent 2px 13px),#EADFCF',
        },
      },
    },
  },

  typography: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

    h1: {
      fontWeight: 800,
      letterSpacing: '-0.04em',
    },

    h2: {
      fontWeight: 750,
      letterSpacing: '-0.025em',
    },
    
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          padding: '10px 20px',
          minHeight: 44,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1.5px solid ${theme.palette.fika.line}`,
          borderRadius: 12,
          boxShadow: 'none',
        }),
      },
    },
    
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },

      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderBottom: `1.5px solid ${theme.palette.fika.line}`,
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: ({ theme }) => ({ 
          borderColor: theme.palette.fika.fieldLine,
          borderWidth: 1.5
        }),
        // overrides the blue autofill tint that the browsers automatically assign
        input: ({ theme }) => ({
          '&:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 100px ${theme.palette.fika.chipOn} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
            caretColor: theme.palette.text.primary,
            borderRadius: 'inherit',
          },
      }),
    },
  },
  }
})