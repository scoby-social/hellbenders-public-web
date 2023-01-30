import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useAtom } from "jotai";

import ConnectWalletButton from "components/common/ConnectWalletButton";
import SearchBar from "components/common/SearchBar/SearchBar";
import {
  currentUser,
  selectedLeader,
  userDeceased,
  userHasNoID,
} from "lib/store";

import TopTabs from "./TopTabs/TopTabs";
import {
  deceasedTitle,
  deceasedUserContainer,
  headerBoxWithImageWrapper,
  headerContentWrapper,
  headerImageWrapper,
  headerTopContent,
  imageStyle,
  leaderboardContentWrapper,
  leaderboardText,
  searchBarWrapper,
} from "./styles";
import { HeaderProps } from "./types";

export const Header = ({ title, isProfile }: HeaderProps) => {
  const [missingID] = useAtom(userHasNoID);
  const [user] = useAtom(currentUser);
  const [leaderDeceased] = useAtom(userDeceased);
  const [leader] = useAtom(selectedLeader);
  const router = useRouter();
  const isSuccessfullyLogged = !missingID && Object.keys(user).length > 0;

  const goToHome = React.useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <Box sx={headerBoxWithImageWrapper}>
      <Box sx={headerContentWrapper}>
        <Box sx={headerTopContent}>
          <Box sx={headerImageWrapper}>
            <Image
              src="/hellbenders_token_ico.svg"
              alt="Hellbenders token ico"
              fill
              style={imageStyle}
              onClick={goToHome}
            />
          </Box>
          {isSuccessfullyLogged && <TopTabs />}
          <ConnectWalletButton primaryColor={false} />
        </Box>

        <Box sx={leaderboardContentWrapper(isProfile)}>
          {isProfile && leaderDeceased ? (
            <Box sx={deceasedUserContainer}>
              <Typography
                variant="h6"
                sx={deceasedTitle}
              >{`DECEASED`}</Typography>
              <Typography>{`This fake ID has been burned.`}</Typography>
              <Typography>{`${leader.username} gone to Hellbenders Heaven.`}</Typography>
            </Box>
          ) : (
            <Typography variant="h1" sx={leaderboardText}>
              {title}
            </Typography>
          )}
        </Box>
        {isSuccessfullyLogged && !isProfile && (
          <Box sx={searchBarWrapper}>
            <SearchBar />
          </Box>
        )}
      </Box>
    </Box>
  );
};
