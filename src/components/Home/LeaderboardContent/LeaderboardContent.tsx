import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useAtom } from "jotai";
import * as React from "react";

import UserCard from "components/common/UserCard/UserCard";
import ConnectWalletButton from "components/common/ConnectWalletButton";
import FilterBar from "components/common/FilterBar/FilterBar";
import CountdownTimer from "components/common/CountdownTimer/CountdownTimer";
import HellbendersDescription from "components/common/HellbendersDescription";
import {
  allLeaderboardUsers,
  currentWallet,
  filteredLeaderboardUsers,
  isLoadingUser,
  leaderboardLoading,
  userHasNoID,
} from "lib/store";

import {
  cardsContainer,
  connectWalletMessageWrapper,
  connectWalletText,
  contentContainerStyles,
} from "./styles";

export const LeaderboardContent = () => {
  const [wallet] = useAtom(currentWallet);
  const [missingID] = useAtom(userHasNoID);
  const [loading] = useAtom(leaderboardLoading);
  const [loadingUser] = useAtom(isLoadingUser);
  const [allUsers] = useAtom(allLeaderboardUsers);
  const [filteredUsers, setFilteredUsers] = useAtom(filteredLeaderboardUsers);

  const renderComponent = () => {
    if (wallet !== "" && !missingID) {
      return (
        <Box sx={{ flex: 1 }}>
          <CountdownTimer />
          <HellbendersDescription />
          <FilterBar allUsers={allUsers} setFilteredUsers={setFilteredUsers} />
          <Box>
            <Grid sx={cardsContainer} container alignItems="stretch">
              {filteredUsers.map((val) => (
                <UserCard key={val._id} {...val} isBroodLeader={false} />
              ))}
            </Grid>
          </Box>
        </Box>
      );
    }

    if (wallet === "" && !missingID) {
      return (
        <Box sx={connectWalletMessageWrapper}>
          <Typography
            variant="h6"
            component="h6"
            sx={connectWalletText}
          >{`Only Members Admitted`}</Typography>
          <Typography
            variant="h6"
            component="h6"
            sx={connectWalletText}
          >{`Connect your Wallet to show your Fake ID at the door`}</Typography>
          <Typography
            variant="h6"
            component="h6"
            sx={connectWalletText}
          >{`To get in quick, connect with a wallet holding only your Fake ID. We don't need to be digging through your sh*t.`}</Typography>
          <ConnectWalletButton primaryColor blackText />
        </Box>
      );
    }

    if (wallet !== "" && missingID) {
      return (
        <Box sx={connectWalletMessageWrapper}>
          <Typography
            variant="h6"
            component="h6"
            sx={connectWalletText}
          >{`Sorry, I don't see your Fake ID.`}</Typography>
          <Typography
            variant="h6"
            component="h6"
            sx={connectWalletText}
          >{`Come back when you have one.`}</Typography>
          <ConnectWalletButton primaryColor blackText />
        </Box>
      );
    }
  };

  return (
    <Box sx={contentContainerStyles}>
      {loading ? (
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : (
        renderComponent()
      )}
    </Box>
  );
};
