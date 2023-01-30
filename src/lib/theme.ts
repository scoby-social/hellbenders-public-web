import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { createBreakpoints } from "@mui/system";

export default function CustomTheme() {
  const breakpoints = createBreakpoints({});

  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "Cabin", "Patched"].join(","),
      body1: {
        fontFamily: "Poppins",
        fontSize: "0.75vmax",
        [breakpoints.up("sm")]: {
          fontSize: "1vmax",
        },
      },
      body2: {
        fontSize: "1vmax !important",
      },
      h1: {
        fontFamily: "Patched",
        fontSize: "3vmax",
        fontWeight: "bold",
        [breakpoints.up("sm")]: {
          fontSize: "3.5vmax",
        },
      },
      h2: {
        fontFamily: "Poppins",
        fontWeight: "800",
        fontSize: "1.5vmax",
        [breakpoints.up("sm")]: {
          fontSize: "2vmax",
        },
      },
      h3: {
        fontWeight: "500",
        fontSize: "1.1vmax",
        [breakpoints.up("sm")]: {
          fontSize: "1.3vmax",
        },
      },
      h6: {
        fontFamily: "Cabin",
        fontSize: "1.1vmax",
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
        styleOverrides: {
          root: {
            borderRadius: "20px",
          },
        },
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
            boxShadow: "none !important",
            fontWeight: "bold !important",
            fontSize: "0.8vmax !important",
            "&.Mui-selected": {
              backgroundColor: "#5D6068 !important",
            },
            "&.Mui-disabled": {
              background: "rgba(72, 83, 100, 0.5) !important",
              color: "rgba(255, 255, 255, 0.5) !important",
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
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "#fff !important",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            border: "none",
          },
          root: {
            background: "rgba(91, 96, 140, 0.06)",
            border: "1px solid rgba(194, 194, 194, 0.35)",
            "&.Mui-focused": {
              background: "rgba(96, 101, 145, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            },
            "&.Mui-error": {
              background: "rgba(235, 87, 87, 0.12)",
              border: "1px solid #EB5757",
            },
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
