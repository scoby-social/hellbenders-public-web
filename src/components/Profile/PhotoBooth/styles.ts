import styled from "@emotion/styled";
import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

import { PhotoBoothFormStyleProps } from "./types";

export const fakeIDFormArrowWrapper: SxProps = {
  padding: "0.75vmax",
  display: "flex",
  justifyContent: "flex-end",
  backgroundColor: "#424E5A",
  borderRadius: "15px 15px 0 0",
};

export const fakeIDFormContainer: SxProps = {
  width: "100%",
  marginTop: "2vmax",
  display: "flex",
  justifyContent: "center",
};

export const formContainer: SxProps = {
  padding: "2vmax 4vmax",
  display: "flex",
  flexFlow: "column",
  justifyContent: "space-around",
};

export const formWrapper: SxProps = {
  margin: "1.5vmax 0",
  display: "flex",
  flex: 1,
  justifyContent: "flex-start",
  flexFlow: "column",
};

export const roleFieldWrapper: SxProps = {
  marginLeft: "1.5vmax",
  display: "flex",
  justifyContent: "space-between",
};

export const socialButtonsWrapper = (isMobile: boolean): SxProps => ({
  maxWidth: isMobile ? "80%" : "60%",
  alignSelf: "start",
  display: "flex",
  justifyContent: "space-between",
});

export const socialButtonWrapper: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const socialConnectButton: SxProps = {
  marginLeft: "1vmin",
};

export const photoBoothContainer: SxProps = {
  width: "100%",
};

export const photoBoothTitleWrapper: SxProps = {
  display: "flex",
  justifyContent: "space-between",
};

export const textWithMargin: SxProps = {
  marginBottom: "0.50vmax",
};

export const Form = styled.form<PhotoBoothFormStyleProps>`
  width: ${(props) => (props.isMobile ? "100%" : "80%")};
  background-color: #2f3841;
  border-radius: 15px;
`;

export const photoBoothFooterWrapper: SxProps = {
  display: "flex",
  flexGrow: 1,
  flexFlow: "column",
};

export const mintButtonWrapper: SxProps = {
  marginTop: "1vmax",
  display: "flex",
  justifyContent: "center",
};

export const iconWrapper: SxProps = {
  width: "1.5vmax",
  height: "1.5vmax",
  position: "relative",
};

export const imageStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};

export const mintingMessageWrapper: SxProps = {
  marginTop: "1vmin",
  marginBottom: "1vmax",
  display: "flex",
  justifyContent: "center",
};

export const mintingMessage: SxProps = {
  maxWidth: "20%",
  textAlign: "center",
};

export const availabilityContainer: SxProps = {
  flexGrow: 1,
  marginTop: "2vmin",
  display: "flex",
  justifyContent: "center",
};

export const availabilityWrapper: SxProps = {
  minWidth: "20%",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const availabilityDescription: SxProps = {
  maxWidth: "55%",
  textAlign: "center",
  fontWeight: "900",
};
