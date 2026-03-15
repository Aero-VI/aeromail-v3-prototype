import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1f1f1f',
      paper: '#1f1f1f',
    },
    text: {
      primary: '#e8eaed',
      secondary: '#9aa0a6',
    },
    primary: {
      main: '#8ab4f8',
    },
    secondary: {
      main: '#00BCD4',
    },
    divider: 'rgba(255,255,255,0.12)',
  },
  typography: {
    fontFamily: '"Google Sans", "Roboto", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 20,
        },
      },
    },
  },
});

export default theme;
