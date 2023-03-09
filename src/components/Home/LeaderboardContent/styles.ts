import { SxProps } from "@mui/material";

export const cardsContainer: SxProps = {
  display: "grid",
  gridTemplateColumns: {
    xs: "auto",
    md: "repeat(3, 1fr)",
  },
  gridGap: "1vmax",
};

export const defaultTextStyles: SxProps = {
  letterSpacing: "0.005em",
  lineHeight: "142%",
};

export const contentContainerStyles: SxProps = {
  marginTop: "1rem",
  margin: "0 3vmax",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const connectWalletMessageWrapper: SxProps = {
  width: "100%",
  height: "100%",
  marginTop: "2vmax",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexFlow: "column",
};

export const connectWalletText: SxProps = {
  margin: "1vmax",
  textAlign: "center",
  maxWidth: "50%",
};

export const countdownWrapper: SxProps = {
  marginTop: "2vmax",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const soldOutSubtitle: SxProps = {
  margin: "0.7vmax 0",
  letterSpacing: "0.035em",
};
