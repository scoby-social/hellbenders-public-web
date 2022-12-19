import { SxProps } from "@mui/material";

export const headerBoxWithImageWrapperStyles: SxProps = {
  width: "100%",
  height: "50vh",
  background: `url(/hellbenders_wallpaper.png)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

export const headerContentWrapperStyles: SxProps = {
  height: "100%",
  display: "flex",
  padding: "3vmin",
  flexFlow: "row",
  justifyContent: "space-between",
};

export const leaderboardContentWrapperStlyes: SxProps = {
  display: "flex",
  alignItems: "center",
  flexFlow: "column",
  alignSelf: "end",
};

export const leaderboardTextStyles: SxProps = {
  fontFamily: "Patched PERSONAL USE ONLY",
  letterSpacing: "0.385em",
};

export const detailsWhenWalletNotConnectedStyles: SxProps = {
  display: "flex",
  alignItems: "center",
  flexFlow: "column",
  backgroundColor: "rgba(104, 104, 104, 0.5)",
  backdropFilter: "blur(2px)",
  padding: "1vmin 8vmin",
  textAlign: "center",
};

export const headerItemsWrapperStyles: SxProps = {
  width: "15%",
};
