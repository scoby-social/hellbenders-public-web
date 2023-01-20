import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { createBreakpoints } from "@mui/system";

export default function CustomTheme() {
  const breakpoints = createBreakpoints({});

  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "Cabin", "Patched"].join(","),
      body1: {
        fontFamily: "Cabin",
        fontSize: "0.75vmax",
        [breakpoints.up("sm")]: {
          fontSize: "1vmax",
        },
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
        fontSize: "1.2vmax",
      },
      subtitle1: {
        fontSize: "1.2vmax",
        fontFamily: "Cabin",
        [breakpoints.up("sm")]: {
          fontSize: "1vmax",
        },
      },
      subtitle2: {
        fontFamily: "Cabin",
        fontSize: "1vmax",
        [breakpoints.up("sm")]: {
          fontSize: "0.80vmax",
        },
      },
      caption: {
        fontSize: "0.80vmax",
        [breakpoints.up("sm")]: {
          fontSize: "0.60vmax",
        },
      },
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            fontFamily: "Poppins",
            fontSize: "0.80vmax",
            [breakpoints.up("sm")]: {
              fontSize: "0.60vmax",
            },
          },
        },
      },
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
            fontSize: "0.8vmax",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            minHeight: 0,
            padding: "1vmax 1.25vmax",
            fontSize: "0.8vmax",
            "& .Mui-selected": {
              backgroundColor: "#4D515B",
            },
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
            fontSize: "0.8vmax !important",
            borderRadius: "20px !important",
            "& .Mui-selected": {
              backgroundColor: "#4D515B",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "#485364",
            color: "#fff",
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
