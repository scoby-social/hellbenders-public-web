import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

export const groupCardContainer = (highlight: boolean): SxProps => {
  const styles: SxProps = {
    display: "flex",
    flexFlow: "column",
    backgroundColor: "#2F3841",
    borderRadius: "20px",
    boxShadow: "0 0 5px 4px #F9A802",
    "&::before": {},
  };
  return styles;
};

export const groupCardTitle = (highlight: boolean): SxProps => {
  const styles: SxProps = {
    width: "100%",
    padding: "1vmax 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px 20px 0px 0px",
    backgroundColor: "#FCAE0E",
    color: "#262F36",
  };

  return styles;
};

export const groupCardContent: SxProps = {
  padding: "1vmax",
  display: "flex",
  flex: 1,
  flexFlow: "column",
  justifyContent: "space-around",
  alignItems: "center",
};

export const supplyWrapper: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
};

export const supplyItem: SxProps = {
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
};

export const imageAndButtonWrapper: SxProps = {
  padding: "0 5vmax",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const statusText: SxProps = {
  maxWidth: "50%",
  textAlign: "center",
};

export const button: SxProps = {
  margin: "1vmax 0",
};

export const imageWrapper: SxProps = {
  width: "8vmax",
  height: "8vmax",
  position: "relative",
};

export const imageStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};
