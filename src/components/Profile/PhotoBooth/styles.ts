import styled from "@emotion/styled";
import { SxProps } from "@mui/material";

import { PhotoBoothFormStyleProps } from "./types";

export const fakeIDFormArrowWrapper: SxProps = {
  padding: "1.5vmax",
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

export const formWrapperWithoutMargin: SxProps = {
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

export const photoBoothContainer: SxProps = {
  width: "100%",
};

export const photoBoothTitleWrapper: SxProps = {
  display: "flex",
  justifyContent: "space-between",
};

export const textWithMargin: SxProps = {
  margin: "0.50vmax 0",
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

export const mintButton: SxProps = {
  padding: "0.3vmax 2.5vmax",
  opacity: 0.7,
  background: "#BEEF00",
};

export const helperText: SxProps = {
  color: "rgba(255, 255, 255, 0.4)",
  marginBottom: "0.50vmax",
};

export const tooltip: SxProps = {
  marginLeft: "0.2vmin",
  alignSelf: "flex-start",
};

export const superheroIdentityWrapper: SxProps = {
  display: "flex",
};

export const roleFormFields: SxProps = {
  maxWidth: "33%",
};

export const formGridGroup: SxProps = {
  padding: "0 0.5vmax",
};
