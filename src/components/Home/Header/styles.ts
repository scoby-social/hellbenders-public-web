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
  flexFlow: "row",
  justifyContent: "space-between",
};

export const leaderboardContentWrapper = (isProfile: boolean): SxProps => {
  const styles = {
    display: "flex",
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
  width: "4vmax",
  height: "4vmax",
  marginLeft: "2vmax",
  position: "relative",
};

export const imageStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};
