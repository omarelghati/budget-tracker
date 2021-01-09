import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core";
const borderBottom = "1px solid #efefef";
const appTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", Helvetica, Arial, sans-serif, "insta-font"',
  },

  palette: {
    primary: {
      main: "#147BDE",
    },
    secondary: {
      main: "#CFD1D5",
    },
    error: {
      main: "#ed4956",
    },
  },

  overrides: {
    MuiFilledInput: {
      root: {
        backgroundColor: "#fafafa",
        border: "1px solid #efefef",
        "&:hover": {
          backgroundColor: "#fafafa",
        },
      },
      underline: {
        "&:after": { borderBottom },
        "&:before": { borderBottom },
        "&:hover:before": { borderBottom },
        "&:hover": { borderBottom },
      },
    },

    MuiButton: {
      root: {
        textTransform: "unset",
      },
      contained: {
        boxShadow: "unset",
      },
    },

    MuiCard: {
      root: {
        boxShadow: "none",
        border: "1px solid #e6e6e6",
      },
    },

    MuiPaper: {
      root: {
        boxShadow: "none",
        border: "1px solid #e6e6e6",
      },
      elevation1: {
        boxShadow: "unset",
      },
    },

    MuiAppBar: {
      root: {
        boxShadow: "none",
        borderBottom: "1px solid #e6e6e6",
      },
    },

    MuiInputAdornment: {
      root: {
        "&$filled&$positionStart": {
          margin: 0,
        },
      },
    },

    MuiTab: {
      labelIcon: {
        "& $wrapper > *:first-child": {
          marginBottom: "unset",
          marginRight: 6,
        },
      },
    },

    MuiDialog: {
      paperScrollPaper: {
        borderRadius: 12,
      },
    },
  },
});

function ThemeProvider({ children }) {
  return <MuiThemeProvider theme={appTheme}>{children}</MuiThemeProvider>;
}

export const useAddPostButtonStyles = makeStyles({
  textField: {
    "& fieldset": {
      border: "none",
    },
  },
  reactCrop: {
    "& > div": {
      gridTemplateColumns: "minmax(auto, 600px)",
      display: "grid",
      placeItems: "center",
    },
  },

  dialogTitle: {
    textAlign: "center",
  },
  dialogPaper: {
    width: "50vw",
    height: "70vh",
  },

  form: {
    display: "grid",
  },

  button: {
    padding: 8,
  },
});

export default ThemeProvider;
