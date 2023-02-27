import { SxProps } from "@mui/material";

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
  textAlign: "center",
  maxWidth: "50%",
};

export const textWithMarginTop: SxProps = {
  ...connectWalletText,
  marginTop: "2vmax",
};

export const textWithFullMargin: SxProps = {
  ...connectWalletText,
  margin: "2vmax",
};
