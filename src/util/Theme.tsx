import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2329a2',
    },
    secondary: {
      main: '#69959e',
    },
    error: {
      main: '#f44336', // Red
    },
    warning: {
      main: '#ff9800', // Orange
    },
    info: {
      main: '#2196f3', // Blue
    },
    success: {
      main: '#4caf50', // Green
    },
    text: {
      primary: '#343739', // Black
      secondary: '#69959e',
    },
    background: {
      default: '#e0e0ff', // Light blue
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          overflow-y: scroll;
        }
      `,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#69959e', // Dark Indigo
    },
    secondary: {
      main: '#d5d7df', // Dark Pink
    },
    error: {
      main: '#d32f2f', // Dark Red
    },
    warning: {
      main: '#ff6d00', // Dark Orange
    },
    info: {
      main: '#1976d2', // Dark Blue
    },
    success: {
      main: '#388e3c', // Dark Green
    },
    text: {
      primary: '#ffffff', // White
      secondary: '#69959e', // White
    },
    background: {
      default: '#343739', // Dark Grey
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          overflow-y: scroll;
        }
      `,
    },
  },
});

export const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    text: {
      primary: '#ffffff',
      secondary: '#90caf9',
    },
    background: {
      default: '#656bf1',
      paper: '#ae57ff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: #656bf1;
        }
      `,
    },
  },
});
