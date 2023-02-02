import { SxProps } from "@mui/material";

export const countdownContainer: SxProps = {
  margin: "2vmax 0",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const timerContainer: SxProps = {
  marginTop: "1vmax",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

export const timerWrapper: SxProps = {
  width: "5vmax",
  height: "5vmax",
  margin: "0 1.5vmax",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "5px",
  backgroundColor: "rgba(104, 104, 104, 0.05)",
  border: "1px solid rgba(69, 81, 91, 0.2)",
  boxShadow: "2px 4px 6px rgba(29, 29, 29, 0.5)",
};
