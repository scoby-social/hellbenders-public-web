import { SxProps } from "@mui/material";

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
  "&:hover": {
    cursor: "pointer",
  },
};

export const filterIconStyles: SxProps = {
  height: "1vmax",
  width: "1vmax",
  marginLeft: "1vmin",
};
