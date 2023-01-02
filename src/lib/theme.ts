import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { createBreakpoints } from "@mui/system";

export default function CustomTheme() {
  const breakpoints = createBreakpoints({});

  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "Cabin", "Patched"].join(","),
      body1: {
        fontFamily: "Cabin",
      },
      h1: {
        fontFamily: "Patched",
        fontSize: "3vmax",
        [breakpoints.up("sm")]: {
          fontSize: "3.5vmax",
        },
      },
      h2: {
        fontFamily: "Patched",
        [breakpoints.up("sm")]: {
          fontSize: "2vmax",
        },
      },
      h6: {
        fontFamily: "Cabin",
        fontSize: "1.5vmax",
        [breakpoints.up("sm")]: {
          fontSize: "0.6vmax",
        },
      },
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: "outlined" },
            style: {
              border: "1px solid rgba(190, 239, 0, 1)",
            },
          },
        ],
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            padding: "0.25vmax !important",
            color: "#fff",
            lineHeight: "1.43vmax",
            "&::placeholder": {
              color: "rgba(255, 255, 255, 0.2)",
            },
            "&.MuiFormHelperText-root": {
              color: "#FFF",
            },
          },
          input: {
            padding: "0.50vmax !important",
            fontSize: "1vmax",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            minHeight: 0,
            padding: "1vmax 1.25vmax",
            fontSize: "1vmax",
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: "rgba(255, 255, 255, 0.4)",
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            fontWeight: "bold !important",
            borderRadius: "20px !important",
          },
        },
      },
    },
    palette: {
      primary: {
        light: "rgba(190, 239, 0, 1)",
        main: "rgba(190, 239, 0, 1)",
        dark: "rgba(190, 239, 0, 0.7)",
        contrastText: "#262F36",
      },
      secondary: {
        main: "#485364",
        contrastText: "#FFF",
      },
    },
  });

  return responsiveFontSizes(theme);
}
