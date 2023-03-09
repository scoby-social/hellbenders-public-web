import { SxProps } from "@mui/material";

export const profileContainer: SxProps = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  flexFlow: "column",
};

export const cardsContainer: SxProps = {
  display: "grid",
  gridTemplateColumns: {
    xs: "auto",
    md: "repeat(3, 1fr)",
  },
  gridGap: "1vmax",
};

export const boxContainer: SxProps = {
  margin: "2vmax",
  display: "flex",
  flexFlow: "column",
  justifyContent: "space-around",
};

export const boxWrapper: SxProps = {
  display: "flex",
  justifyContent: "space-around",
};

export const loaderWrapperStyles: SxProps = {
  marginTop: "1rem",
  margin: "0 3rem",
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

export const emptyBroodWrapper: SxProps = {
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const connectWalletText: SxProps = {
  margin: "1vmax",
  textAlign: "center",
  maxWidth: "50%",
};

export const emptyBroodText: SxProps = {
  margin: "1vmin 0",
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
