import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useAtom } from "jotai";
import * as React from "react";

import UserCard from "components/common/UserCard/UserCard";
import ConnectWalletButton from "components/common/ConnectWalletButton";
import FilterBar from "components/common/FilterBar/FilterBar";
import CountdownTimer from "components/common/CountdownTimer/CountdownTimer";
import HellbendersDescription from "components/common/HellbendersDescription";
import NotConnectedWallet from "components/common/NotConnectedWallet/NotConnectedWallet";
import { getLeaderboardUsers } from "lib/axios/requests/users/getLeaderboardUsers";
import { searchTextFilter, selectedSortFilter } from "lib/store/filters";
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
  countdownWrapper,
} from "./styles";

const ITEMS_PER_PAGE = 15;

export const LeaderboardContent = () => {
  const fetchingRef = React.useRef(false);
  const [wallet] = useAtom(currentWallet);
  const [missingID] = useAtom(userHasNoID);
  const [loading] = useAtom(leaderboardLoading);
  const [searchText] = useAtom(searchTextFilter);
  const [selectedSort] = useAtom(selectedSortFilter);
  const [loadingUser] = useAtom(isLoadingUser);
  const [allUsers, setAllUsers] = useAtom(allLeaderboardUsers);
  const [filteredUsers, setFilteredUsers] = useAtom(filteredLeaderboardUsers);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [finishedPaginate, setFinishedPaginate] = React.useState(false);

  const executeBroodSearch = React.useCallback(
    async (page: number) => {
      if (!fetchingRef.current) {
        fetchingRef.current = true;

        const users = await getLeaderboardUsers(
          page * ITEMS_PER_PAGE,
          ITEMS_PER_PAGE,
          searchText,
          selectedSort.name,
          selectedSort.value
        );

        if (users.length === 0) setFinishedPaginate(true);

        setCurrentPage(page + 1);
        fetchingRef.current = false;
        return users;
      }
      return [];
    },
    // eslint-disable-next-line
    [selectedSort, searchText]
  );

  const paginate = React.useCallback(async () => {
    const users = await executeBroodSearch(currentPage);
    setAllUsers((prevUsers) => [...prevUsers, ...users]);
    setFilteredUsers((prevUsers) => [...prevUsers, ...users]);
    // eslint-disable-next-line
  }, [executeBroodSearch, currentPage]);

  const filterUsers = React.useCallback(async () => {
    const users = await executeBroodSearch(0);
    setAllUsers([...users]);
    setFilteredUsers([...users]);
    // eslint-disable-next-line
  }, [executeBroodSearch]);

  React.useEffect(() => {
    filterUsers();
    // eslint-disable-next-line
  }, [searchText, selectedSort]);

  const renderComponent = () => {
    if (wallet !== "" && !missingID) {
      return (
        <Box sx={{ flex: 1 }}>
          <Box sx={countdownWrapper}>
            <Typography>{`Hellbenders DAO or DIE minting starts in`}</Typography>
            <CountdownTimer />
          </Box>
          <HellbendersDescription />
          <FilterBar allUsers={allUsers} setFilteredUsers={setFilteredUsers} />
          <Box>
            <Grid sx={cardsContainer} container alignItems="stretch">
              {filteredUsers.map((val, index) => (
                <UserCard
                  paginate={paginate}
                  isLast={
                    filteredUsers.length - 1 === index && !finishedPaginate
                  }
                  key={`${val._id}-${index}`}
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
        <NotConnectedWallet
          title={`Only Members Admitted`}
          subtitle={`Connect your Wallet to show your Fake ID at the door`}
          footer={`To get in quick, connect with a wallet holding only your Fake ID. We don't need to be digging through your sh*t.`}
        />
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
