import { red, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  typography: {
    fontFamily: 'roboto',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          fontFamily: 'roboto',
        },
      },
    },
  },
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: grey[200],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
