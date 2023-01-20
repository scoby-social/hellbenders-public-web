import { SxProps } from "@mui/material";

export const mintFakeIDHeaderWrapper: SxProps = {
  backgroundColor: "#2F3841",
  borderRadius: "15px 15px",
};

export const mintFakeIDHeaderTitleWrapper: SxProps = {
  padding: "0.75vmin 1vmin",
  backgroundColor: "#424E5A",
  display: "flex",
  flexFlow: "row",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "15px 15px 0 0",
};

export const mintFakeIDContentWrapper: SxProps = {
  width: "100%",
  padding: "0.5vmax 0",
  backgroundColor: "#2F3841",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderRadius: "0 0 15px 15px",
};

export const royaltyShareContainer: SxProps = {
  width: "100%",
  padding: "1vmax 0",
  display: "flex",
  flexFlow: "column",
  borderRadius: "15px 15px 0 0",
};

export const royaltyShareTitle: SxProps = {
  marginLeft: "2vmax",
  marginBottom: "1vmin",
};

export const royaltiesContainer: SxProps = {
  display: "flex",
  margin: "0 2vmax",
};

export const royaltyWrapper: SxProps = {
  flex: 1,
};

const royaltyTitleWrapper: SxProps = {
  paddingBottom: "0.5vmin",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
};

export const leftRoyaltyTitle: SxProps = {
  ...royaltyTitleWrapper,
  borderRight: "0.5px solid rgba(255, 255, 255, 0.2)",
};

export const rightRoyaltyTitle: SxProps = {
  ...royaltyTitleWrapper,
  borderLeft: "0.5px solid rgba(255, 255, 255, 0.2)",
};

const royaltyContentWrapper: SxProps = {
  paddingTop: "0.5vmin",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const leftRoyaltyContent: SxProps = {
  ...royaltyContentWrapper,
  borderRight: "0.5px solid rgba(255, 255, 255, 0.2)",
};

export const rightRoyaltyContent: SxProps = {
  ...royaltyContentWrapper,
  borderLeft: "0.5px solid rgba(255, 255, 255, 0.2)",
};

export const mintFakeIDTitle: SxProps = {
  maxWidth: "45%",
  flexGrow: 1,
  textAlign: "center",
};

export const mintFakeIDTextDescription: SxProps = {
  maxWidth: "55%",
  textAlign: "center",
};

export const availabilityContainer: SxProps = {
  flexGrow: 1,
  marginTop: "2vmin",
  display: "flex",
  justifyContent: "space-evenly",
};

export const availabilityWrapper: SxProps = {
  minWidth: "30%",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};
