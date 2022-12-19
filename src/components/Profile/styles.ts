import { SxProps } from "@mui/material";

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

export const mintFakeIDHeaderWrapper: SxProps = {
  backgroundColor: "#2F3841",
  borderRadius: "15px 15px",
};

export const mintFakeIDHeaderTitleWrapper: SxProps = {
  padding: "0.75vmin 1vmin",
  backgroundColor: "#424E5A",
  display: "flex",
  flexFlow: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "15px 15px 0 0",
};

export const mintFakeIDContentWrapper: SxProps = {
  height: "80%",
  padding: "1vmax 0",
  backgroundColor: "#2F3841",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderRadius: "0 0 15px 15px",
};

export const mintFakeIDTitle: SxProps = {
  maxWidth: "45%",
};

export const mintFakeIDTextDescription: SxProps = {
  maxWidth: "55%",
  textAlign: "center",
};
