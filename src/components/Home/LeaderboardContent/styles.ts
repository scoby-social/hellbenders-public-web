import { SxProps } from "@mui/material";

export const defaultTextStyles: SxProps = {
  letterSpacing: "0.005em",
  lineHeight: "142%",
};

export const contentContainerStyles: SxProps = {
  marginTop: "1rem",
  margin: "0 3rem",
};

export const filtersBoxWrapperStyles: SxProps = {
  padding: "1vmax 3vmax",
  marginTop: "1vmax",
  marginBottom: "1.5vmax",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "rgba(217, 217, 217, 0.14)",
  borderTop: "1px solid #393C45",
};

export const filterWrapperStyles: SxProps = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

export const filterIconStyles: SxProps = {
  height: "1.5vmax",
  width: "1.5vmax",
};
