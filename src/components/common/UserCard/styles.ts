import { SxProps } from "@mui/material";

export const defaultText: SxProps = {
  letterSpacing: "0.005em",
  lineHeight: "142%",
};

export const cardContainer: SxProps = {
  backgroundColor: "#393C45",
  borderRadius: 5,
};

export const unitLeaderFlag: SxProps = {
  maxWidth: "25%",
  padding: "0.3vmax",
  marginBottom: "0.3vmin",
  display: "flex",
  justifyContent: "center",
  alignSelf: "start",
  backgroundColor: "#579ABA",
  borderRadius: "20px 0",
};

export const contentCard = (isBroodLeader: boolean): SxProps => {
  const style: SxProps = {
    padding: isBroodLeader ? "0 0 1.5vmax 0" : "1.5vmax 0",
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-evenly",
  };

  return style;
};

export const avatarWrapper: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const avatarStyles: SxProps = {
  width: "6vmax",
  height: "6vmax",
};

export const cardContentBoxWrapper: SxProps = {
  minWidth: "45%",
  maxWidth: "60%",
  display: "flex",
  flexFlow: "column",
};

export const cardTitleText: SxProps = {
  ...defaultText,
  fontWeight: 800,
};

export const userRankWrapper: SxProps = {
  width: "100%",
  padding: "0.25vmax",
  marginTop: "0.50vmax",
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: "#434E59",
  borderRadius: 2,
};
