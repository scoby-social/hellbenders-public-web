import { Box, Typography } from "@mui/material";
import Image from "next/image";

import ConnectWalletButton from "components/common/ConnectWalletButton";
import {
  detailsWhenWalletNotConnectedStyles,
  headerBoxWithImageWrapperStyles,
  headerContentWrapperStyles,
  headerItemsWrapperStyles,
  leaderboardContentWrapperStlyes,
  leaderboardTextStyles,
} from "./styles";

export const Header = () => (
  <Box sx={headerBoxWithImageWrapperStyles}>
    <Box sx={headerContentWrapperStyles}>
      <Box sx={headerItemsWrapperStyles}>
        <Image
          src="/hellbenders_token_ico.svg"
          alt="Hellbenders token ico"
          width="70"
          height="70"
        />
      </Box>
      <Box sx={leaderboardContentWrapperStlyes}>
        <Typography variant="h1" sx={leaderboardTextStyles}>
          Leaderboard
        </Typography>
        <Box sx={detailsWhenWalletNotConnectedStyles}>
          <Typography>
            Only Members Admitted
            <br />
            <br />
            Connect your Wallet to show your Fake ID at the door.
            <br />
            <br />
            To get in quick, connect with a wallet holding only your
            <br />
            Fake ID. We don't need to be digging through your sh*t.
          </Typography>
          <ConnectWalletButton primaryColor={false} />
        </Box>
      </Box>
      <Box sx={headerItemsWrapperStyles}>
        <ConnectWalletButton primaryColor />
      </Box>
    </Box>
  </Box>
);
