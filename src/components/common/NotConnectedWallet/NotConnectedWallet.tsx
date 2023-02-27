import { Box, Typography } from "@mui/material";

import ConnectWalletButton from "../ConnectWalletButton";
import {
  connectWalletMessageWrapper,
  connectWalletText,
  textWithFullMargin,
  textWithMarginTop,
} from "./styles";
import { NotConnectedWalletProps } from "./types";

const NotConnectedWallet = ({
  title,
  subtitle,
  footer,
}: NotConnectedWalletProps) => (
  <Box sx={connectWalletMessageWrapper}>
    <Typography variant="h6" component="h6" sx={textWithMarginTop}>
      {title}
    </Typography>
    <Typography variant="h6" component="h6" sx={connectWalletText}>
      {subtitle}
    </Typography>
    {footer && (
      <Typography variant="h6" component="h6" sx={textWithFullMargin}>
        {footer}
      </Typography>
    )}
    <ConnectWalletButton primaryColor blackText />
  </Box>
);

export default NotConnectedWallet;
