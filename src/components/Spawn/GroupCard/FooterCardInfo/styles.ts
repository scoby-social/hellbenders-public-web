import { SxProps } from "@mui/material";

export const infoWrapper: SxProps = {
  width: "100%",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const discountInfoContainer: SxProps = {
  width: "100%",
  marginTop: "1vmax",
  display: "flex",
  justifyContent: "space-around",
};

export const defaultInfoContainer: SxProps = {
  width: "100%",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

const defaultTextStyles: SxProps = {
  letterSpacing: "0.035em",
};

export const boldText: SxProps = {
  ...defaultTextStyles,
  fontWeight: "700",
};

export const highlightText: SxProps = {
  ...defaultTextStyles,
  fontWeight: 900,
  transform: "scale(1.50)",
  color: "#BEEF00",
};

export const titleText: SxProps = {
  ...defaultTextStyles,
  marginBottom: "0.5vmax",
};
