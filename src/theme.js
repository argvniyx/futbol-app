import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#222',
    },
    secondary: {
      main: '#648dae',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#eee',
      secondary: "#fff"
    },
  },
});

export default theme;
