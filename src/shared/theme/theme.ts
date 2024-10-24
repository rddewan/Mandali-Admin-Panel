import { createTheme } from '@mui/material/styles';

// Define light and dark themes
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            // is generally used for the default background color of the application or the main content areas
            default: '#fafafa',
            // is used for surfaces that are meant to stand out from the default background, such as cards, dialogs, and paper elements
            paper: '#ffffff',
        },
        primary: {
            main: '#1976d2',
            light: '#63a4ff',
            dark: '#004ba0',
            contrastText: '#fff',
        },
        secondary: {
            main: '#dc004e',
            light: '#ff6f6f',
            dark: '#9a0036',
            contrastText: '#000',
        },
        error: {
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f',
            contrastText: '#fff',
        },
        warning: {
            main: '#ff9800',
            light: '#ffb74d',
            dark: '#f57c00',
            contrastText: '#000',
        },
        info: {
            main: '#2196f3',
            light: '#64b5f6',
            dark: '#1976d2',
            contrastText: '#fff',
        },
        success: {
            main: '#4caf50',
            light: '#81c784',
            dark: '#388e3c',
            contrastText: '#fff',
        },
        text: {
            primary: '#000000',
            secondary: '#757575',
            disabled: '#bdbdbd',          
        },
        divider: '#e0e0e0',
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            // is generally used for the default background color of the application or the main content areas
            default: '#303030',
            //is used for surfaces that are meant to stand out from the default background, such as cards, dialogs, and paper elements
            paper: '#424242',
        },
        primary: {
            main: '#90caf9',
            light: '#b3e5fc',
            dark: '#42a5f5',
            contrastText: '#000',
          },
          secondary: {
            main: '#f48fb1',
            light: '#f6c1c0',
            dark: '#d81b60',
            contrastText: '#000',
          },
          error: {
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f',
            contrastText: '#fff',
          },
          warning: {
            main: '#ff9800', 
            light: '#ffb74d',
            dark: '#f57c00',
            contrastText: '#000',
          },
          info: {
            main: '#64b5f6', 
            light: '#90caf9',
            dark: '#42a5f5',
            contrastText: '#000',
          },
          success: {
            main: '#66bb6a', 
            light: '#81c784',
            dark: '#388e3c',
            contrastText: '#fff',
          },          
          text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
            disabled: '#757575',
          },
          divider: '#616161', 
    },
});

export { lightTheme, darkTheme };