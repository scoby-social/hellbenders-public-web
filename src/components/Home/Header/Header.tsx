import { Box, Typography } from "@mui/material";
import Image from "next/image";

import ConnectWalletButton from "components/common/ConnectWalletButton";
import {
  detailsWhenWalletNotConnected,
  headerBoxWithImageWrapper,
  headerContentWrapper,
  headerItemsWrapper,
  leaderboardContentWrapper,
  leaderboardText,
} from "./styles";
import { HeaderProps } from "./types";

export const Header = ({ title, isProfile }: HeaderProps) => {
  return (
    <Box sx={headerBoxWithImageWrapper}>
      <Box sx={headerContentWrapper}>
        <Box sx={headerItemsWrapper}>
          <Image
            src="/hellbenders_token_ico.svg"
            alt="Hellbenders token ico"
            width="70"
            height="70"
          />
        </Box>
        <Box sx={leaderboardContentWrapper(isProfile)}>
          <Typography variant="h1" sx={leaderboardText}>
            {title}
          </Typography>
          {!isProfile && (
            <Box sx={detailsWhenWalletNotConnected}>
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
          )}
        </Box>
        <Box sx={headerItemsWrapper}>
          <ConnectWalletButton primaryColor />
        </Box>
      </Box>
    </Box>
  );
};
