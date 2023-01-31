import { SxProps } from "@mui/material";

export const filtersBoxWrapper: SxProps = {
  padding: "1vmax 3vmax",
  marginTop: "1.5vmax",
  marginBottom: "1.5vmax",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(217, 217, 217, 0.01)",
  borderTop: "1px solid #393C45",
};

export const filterWrapper: SxProps = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  "&:hover": {
    cursor: "pointer",
  },
};

export const filterTabsWrapper: SxProps = {
  width: "100%",
  display: "flex",
  flex: 1,
  justifyContent: "space-around",
  alignItems: "center",
};

export const filterIcon: SxProps = {
  height: "1vmax",
  width: "1vmax",
  marginLeft: "1vmin",
};

export const broodFiltersWrapper: SxProps = {
  width: "40%",
  marginTop: "2vmax",
  marginLeft: "2vmax",
  display: "flex",
  justifyContent: "space-evenly",
  alignSelf: "start",
  alignItems: "center",
};
