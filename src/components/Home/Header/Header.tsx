import { Box, Typography } from "@mui/material";
import Image from "next/image";

import ConnectWalletButton from "components/common/ConnectWalletButton";
import {
  headerBoxWithImageWrapper,
  headerContentWrapper,
  headerImageWrapper,
  imageStyle,
  leaderboardContentWrapper,
  leaderboardText,
} from "./styles";
import { HeaderProps } from "./types";

export const Header = ({ title, isProfile }: HeaderProps) => {
  return (
    <Box sx={headerBoxWithImageWrapper}>
      <Box sx={headerContentWrapper}>
        <Box sx={headerImageWrapper}>
          <Image
            src="/hellbenders_token_ico.svg"
            alt="Hellbenders token ico"
            fill
            style={imageStyle}
          />
        </Box>
        <Box sx={leaderboardContentWrapper(isProfile)}>
          <Typography variant="h1" sx={leaderboardText}>
            {title}
          </Typography>
        </Box>
        <Box>
          <ConnectWalletButton primaryColor={false} />
        </Box>
      </Box>
    </Box>
  );
};
