import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

export const layerWrapper: SxProps = {
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const imageWrapper = (selected: boolean): SxProps => ({
  width: selected ? "12vmax" : "8vmax",
  height: selected ? "12vmax" : "8vmax",
  position: "relative",
});

export const captionTextColor: SxProps = {
  color: "rgba(255, 255, 255, 0.8)",
  userSelect: "none",
};

export const layerExceptionCaption: SxProps = {
  ...captionTextColor,
  maxWidth: "250px",
  margin: "1vmax 0",
  textAlign: "center",
  userSelect: "none",
};

export const imageStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};
