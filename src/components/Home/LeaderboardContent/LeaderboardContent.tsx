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
import { getLeaderboardUsers } from "lib/axios/requests/users/getLeaderboardUsers";

const ITEMS_PER_PAGE = 15;

export const LeaderboardContent = () => {
  const fetchingRef = React.useRef(false);
  const [wallet] = useAtom(currentWallet);
  const [missingID] = useAtom(userHasNoID);
  const [loading] = useAtom(leaderboardLoading);
  const [loadingUser] = useAtom(isLoadingUser);
  const [allUsers, setAllUsers] = useAtom(allLeaderboardUsers);
  const [filteredUsers, setFilteredUsers] = useAtom(filteredLeaderboardUsers);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [finishedPaginate, setFinishedPaginate] = React.useState(false);

  const paginateUsers = React.useCallback(async () => {
    if (!fetchingRef.current) {
      fetchingRef.current = true;

      const page = currentPage + 1;
      const users = await getLeaderboardUsers(
        currentPage * ITEMS_PER_PAGE,
        ITEMS_PER_PAGE
      );

      if (users.length === 0) setFinishedPaginate(true);

      setCurrentPage(page);
      setAllUsers((prevUsers) => [...prevUsers, ...users]);
      setFilteredUsers((prevUsers) => [...prevUsers, ...users]);

      fetchingRef.current = false;
    }
  }, [currentPage, setAllUsers, setFilteredUsers]);

  const renderComponent = () => {
    if (wallet !== "" && !missingID) {
      return (
        <Box sx={{ flex: 1 }}>
          <CountdownTimer />
          <HellbendersDescription />
          <FilterBar allUsers={allUsers} setFilteredUsers={setFilteredUsers} />
          <Box>
            <Grid sx={cardsContainer} container alignItems="stretch">
              {filteredUsers.map((val, index) => (
                <UserCard
                  paginate={paginateUsers}
                  isLast={
                    filteredUsers.length - 1 === index && !finishedPaginate
                  }
                  key={val._id}
                  {...val}
                  isBroodLeader={false}
                />
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
