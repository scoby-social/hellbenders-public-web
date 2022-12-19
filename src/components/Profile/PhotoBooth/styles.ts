import styled from "@emotion/styled";
import { SxProps } from "@mui/material";

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

export const socialButtonsWrapper: SxProps = {
  alignSelf: "start",
  display: "flex",
  justifyContent: "space-evenly",
};

export const photoBoothContainer: SxProps = {
  width: "100%",
};

export const photoBoothTitleWrapper: SxProps = {
  display: "flex",
  justifyContent: "space-between",
};

export const photoBoothWrapper: SxProps = {
  padding: "1.5vmax",
  border: "1px dashed #5B608C",
  borderRadius: 8,
};

export const textWithMargin: SxProps = {
  marginBottom: "0.50vmax",
};

export const Form = styled.form`
  width: 80%;
  background-color: #2f3841;
  border-radius: 15px;
`;
