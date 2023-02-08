// pages/404.js

import { Header } from "components/common/Header/Header";
import { Box, SxProps, Typography } from "@mui/material";

const headerBoxContainerStyle: SxProps = {
  paddingBottom: "1rem",
};

const textStyle: SxProps = {
  margin: "0.5vmin 0",
  color: "#FAD326",
  textAlign: "center",
};

const textContainer: SxProps = {
  marginTop: "5vmax",
};

export default function Custom404() {
  return (
    <Box sx={headerBoxContainerStyle}>
      <Header title="You're Lost" isProfile />
      <Box sx={textContainer}>
        <Typography variant="h3" sx={textStyle}>
          {"Someone sent you a bum link."}
        </Typography>
        <Typography variant="h3" sx={textStyle}>
          {"Time to f*ck ‘em up."}
        </Typography>
      </Box>
    </Box>
  );
}
