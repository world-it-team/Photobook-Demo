import { createMuiTheme } from "@material-ui/core/styles"
import { green, grey, red } from "@material-ui/core/colors"

const rawTheme = createMuiTheme({
  typography: {
    // fontFamily: "'Roboto', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
    fontFamilySecondary: "'Roboto Condensed', sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1280,
      xl: 1920,
    },
  },
})

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: rawTheme.typography.fontFamilySecondary,
  textTransform: "uppercase",
}

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 30,
      color:"#2278CF",
    },
    h4: {
      ...rawTheme.typography.h4,
      fontSize: 18,
      fontWeight: rawTheme.typography.fontWeightBold,
      [rawTheme.breakpoints.up('sm')]: {
        fontSize: 22,
      },
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 14,
      fontWeight: rawTheme.typography.fontWeightBold,
      [rawTheme.breakpoints.up('sm')]: {
        fontSize: 20,
      },
    },
    h6: {
      ...rawTheme.typography.h6,
      fontSize: 12,
      fontWeight: rawTheme.typography.fontWeightBold,
      [rawTheme.breakpoints.up('sm')]: {
        fontSize: 18,
      },
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 12,
      [rawTheme.breakpoints.up('sm')]: {
        fontSize: 18,
      },
    },
    body1: {
      ...rawTheme.typography.body1,
      fontWeight: rawTheme.typography.fontWeightMedium,
      fontSize: 16,
      [rawTheme.breakpoints.up('sm')]: {
        fontSize: 20,
      },
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 12,
      fontWeight: rawTheme.typography.fontWeightRegular,
      [rawTheme.breakpoints.up('sm')]: {
        fontSize: 16,
      },
    },
  },
}

export default theme