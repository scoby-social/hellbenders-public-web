import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

export const headerBoxWithImageWrapper: SxProps = {
  width: "100%",
  height: "50vh",
  background: `url(/hellbenders_wallpaper.png)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

export const headerContentWrapper: SxProps = {
  height: "100%",
  display: "flex",
  padding: "3vmin",
  flexFlow: "column",
};

export const headerTopContent: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
};

export const searchBarWrapper: SxProps = {
  display: "flex",
  justifyContent: "center",
};

export const leaderboardContentWrapper = (isProfile: boolean): SxProps => {
  const styles = {
    width: "80%",
    height: "100%",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column",
    alignSelf: "center",
  };

  if (isProfile) styles.alignSelf = "center";

  return styles;
};

export const leaderboardText: SxProps = {
  letterSpacing: "0.385em",
  textAlign: "center",
  userSelect: "none",
};

export const headerImageWrapper: SxProps = {
  width: "8vmax",
  height: "4vmax",
  position: "relative",
};

export const imageStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  cursor: "pointer",
};

export const deceasedUserContainer: SxProps = {
  width: "50%",
  height: "60%",
  padding: "0.5vmax",
  display: "flex",
  flexFlow: "column",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "rgba(255, 74, 74, 0.52)",
  backdropFilter: "blur(4.5px)",
  borderRadius: "20px",
};

export const deceasedTitle: SxProps = {
  fontWeight: "900",
};

export const buttonWrapper: SxProps = {
  width: "10vmax",
};
