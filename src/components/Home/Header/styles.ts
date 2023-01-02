import { SxProps } from "@mui/material";

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
    alignSelf: "end",
  };

  if (isProfile) styles.alignSelf = "center";

  return styles;
};

export const leaderboardText: SxProps = {
  letterSpacing: "0.385em",
};

export const detailsWhenWalletNotConnected: SxProps = {
  display: "flex",
  alignItems: "center",
  flexFlow: "column",
  backgroundColor: "rgba(104, 104, 104, 0.5)",
  backdropFilter: "blur(2px)",
  padding: "1vmin 8vmin",
  textAlign: "center",
};

export const headerItemsWrapper: SxProps = {
  width: "15%",
};
