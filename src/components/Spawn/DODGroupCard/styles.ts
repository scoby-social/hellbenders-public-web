import { SxProps } from "@mui/material";

export const groupCardContainer = (highlight: boolean): SxProps => {
  const styles: SxProps = {
    display: "flex",
    flexFlow: "column",
    backgroundColor: "#2F3841",
    borderRadius: "20px",
    "&::before": {},
  };

  if (highlight) {
    styles.boxShadow = "0 0 5px 4px #F9A802";
  }

  return styles;
};

export const groupCardTitle = (highlight: boolean): SxProps => {
  const styles: SxProps = {
    width: "100%",
    marginTop: "1vmax",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px 20px 0px 0px",
  };

  if (highlight) {
    styles.marginTop = "0";
    styles.padding = "1vmax 0";
    styles.backgroundColor = "#FCAE0E";
    styles.color = "#262F36";
  }

  return styles;
};

export const groupCardContent: SxProps = {
  padding: "1vmax",
  display: "flex",
  flex: 1,
  flexFlow: "column",
  justifyContent: "space-around",
  alignItems: "center",
};

export const supplyWrapper: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
};

export const supplyItem: SxProps = {
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
};

export const imageAndButtonWrapper: SxProps = {
  padding: "0 5vmax",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const button: SxProps = {
  margin: "1vmax 0",
};
