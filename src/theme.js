import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1f1f1f',
      paper: '#2a2a2a',
    },
    primary: {
      main: '#8ab4f8',
      dark: '#669df6',
    },
    secondary: {
      main: '#00BCD4',
    },
    text: {
      primary: '#e8eaed',
      secondary: '#9aa0a6',
    },
    divider: '#3c4043',
    action: {
      hover: 'rgba(232,234,237,0.08)',
      selected: 'rgba(138,180,248,0.16)',
    },
    error: { main: '#f28b82' },
    warning: { main: '#fdd663' },
    success: { main: '#81c995' },
  },
  typography: {
    fontFamily: '"Google Sans", "Roboto", "Arial", sans-serif',
    fontSize: 14,
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#1f1f1f',
          color: '#e8eaed',
          '&::-webkit-scrollbar': { width: 8 },
          '&::-webkit-scrollbar-track': { background: '#1f1f1f' },
          '&::-webkit-scrollbar-thumb': { background: '#3c4043', borderRadius: 4 },
        },
        '*::-webkit-scrollbar': { width: 8 },
        '*::-webkit-scrollbar-track': { background: '#1f1f1f' },
        '*::-webkit-scrollbar-thumb': { background: '#3c4043', borderRadius: 4 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 20 },
      },
    },
  },
});

export default theme;
