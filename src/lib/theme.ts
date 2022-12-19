import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export default function CustomTheme() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "Cabin", "Patched"].join(","),
      body1: {
        fontFamily: "Cabin",
      },
      h1: {
        fontFamily: "Patched",
      },
      h2: {
        fontFamily: "Patched",
      },
      h6: {
        fontFamily: "Cabin",
      },
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: "contained" },
            style: {
              textTransform: "none",
              border: `10px dashed red`,
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
    },
  });

  return responsiveFontSizes(theme);
}
