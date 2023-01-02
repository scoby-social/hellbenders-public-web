import { SxProps } from "@mui/material";

export const imageWrapper: SxProps = {
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    cursor: "pointer",
  },
};

export const captionTextColor: SxProps = {
  color: "rgba(255, 255, 255, 0.8)",
};

export const layerExceptionCaption: SxProps = {
  ...captionTextColor,
  maxWidth: "250px",
  margin: "1vmax 0",
  textAlign: "center",
};
