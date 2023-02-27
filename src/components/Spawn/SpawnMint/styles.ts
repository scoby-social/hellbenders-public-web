import { SxProps } from "@mui/material";

export const spawnTitleWrapper: SxProps = {
  marginTop: "2vmax",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const cardsContainer: SxProps = {
  marginTop: "2vmax",
  display: "grid",
  gridTemplateColumns: {
    xs: "auto",
    md: "repeat(2, 1fr)",
  },
  gridGap: "2vmax",
};

export const spawnSubtitle: SxProps = {
  marginTop: "0.7vmax",
  letterSpacing: "0.035em",
};

export const spawnContainer: SxProps = {
  width: "100vw",
  padding: "0 5vmax",
  display: "flex",
  flexFlow: "column",
};

export const supplyInfoContainer: SxProps = {
  marginTop: "2vmax",
  display: "flex",
  justifyContent: "space-evenly",
};

export const supplyInfoItemWrapper: SxProps = {
  padding: "1vmax 3vmax",
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  backgroundColor: "rgba(52, 55, 65, 0.8)",
  borderRadius: "20px",
};
