import { SxProps } from "@mui/material";
export const cardsContainer: SxProps = {
  marginTop: "2vmax",
  display: "grid",
  gridTemplateColumns: {
    xs: "auto",
    md: "repeat(2, 1fr)",
  },
  gridGap: "2vmax",
};

export const spawnContainer: SxProps = {
  width: "100vw",
  padding: "0 5vmax",
  display: "flex",
  flexFlow: "column",
};

export const spawnTitleWrapper: SxProps = {
  marginTop: "2vmax",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const spawnLinksWrapper: SxProps = {
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const spawnsInfoWrapper: SxProps = {
  marginTop: "2vmax",
  padding: "1vmax 3vmax",
  display: "grid",
  alignSelf: "center",
  gridTemplateColumns: {
    xs: "auto",
    md: "repeat(2, 1fr)",
  },
  gridGap: "2vmax",
  backgroundColor: "rgba(52, 55, 65, 0.7)",
  borderRadius: "20px",
};

export const spawnUnitWrapper: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const spawnLinks: SxProps = {
  color: "#FFF",
  fontSize: "0.7vmax !important",
};

export const boldText: SxProps = {
  fontWeight: "700",
};

export const titleText: SxProps = {
  ...boldText,
  marginBottom: "1vmax",
  textAlign: "center",
};

export const spawnTradeText: SxProps = {
  ...titleText,
  color: "#FFC800",
};
