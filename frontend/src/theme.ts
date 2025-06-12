import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Palette controls all colors: primary, secondary, background, text, etc.
  palette: {
    mode: 'light', // light theme mode

    // Primary color (main brand color)
    primary: {
      main: '#FF6F61', // salmon pink
      contrastText: '#ffffff', // white text on salmon buttons
    },

    // Secondary color (accent color)
    secondary: {
      main: '#FFD700', // gold accent
      contrastText: '#212121', // dark text on gold buttons
    },

    // Background colors for app background and paper/cards
    background: {
      default: '#ffffff',  // pure white background
      paper: '#f9f9f9',    // very light gray for cards/surfaces
    },

    // Text colors for primary and secondary text
    text: {
      primary: '#212121',   // almost black for text, for readability
      secondary: '#555555', // medium gray for secondary text
    },

    // Divider color (lines, borders, outlines)
    divider: '#e0e0e0',    // light gray divider/outline color

    // Action colors for interactive states like hover, selected, disabled
    action: {
      hover: 'rgba(255,111,97,0.15)',  // subtle salmon hover effect
      selected: 'rgba(255,215,0,0.15)', // subtle gold selected effect
      disabled: '#c0c0c0', // light gray for disabled states
    },
  },

  // Typography controls fonts, weights, sizes, and colors for text variants
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',

    // h2 header styling
    h2: {
      fontWeight: 700,
      letterSpacing: '1px',
      color: '#FF6F61', // salmon h2 for brand emphasis
    },

    // h4 header styling
    h4: {
      fontWeight: 600,
      color: '#212121',
    },

    // h6 header styling
    h6: {
      fontWeight: 400,
      color: '#555555',
    },
  },

  // Shape controls default border-radius for components
  shape: {
    borderRadius: 12,
  },

  // Component-specific overrides for styling MUI components
  components: {
    // Paper (cards, surfaces)
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #e0e0e0', // subtle light outline on cards
          backgroundColor: '#f9f9f9',  // keep cards very light
        },
      },
    },

    // Buttons
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#FF6F61',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#e65a4f', // slightly darker salmon on hover
          },
        },
        containedSecondary: {
          backgroundColor: '#FFD700',
          color: '#212121',
          '&:hover': {
            backgroundColor: '#e6c200', // darker gold on hover
          },
        },
      },
    },
  },
});

export default theme;
