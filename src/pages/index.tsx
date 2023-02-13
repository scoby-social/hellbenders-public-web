import { Box, SxProps } from "@mui/material";
import * as React from "react";
import { useAtom } from "jotai";

import { Header } from "components/common/Header/Header";
import { LeaderboardContent } from "components/Home/LeaderboardContent/LeaderboardContent";
import {
  allLeaderboardUsers,
  filteredLeaderboardUsers,
  leaderboardLoading,
  userHasNoID,
} from "lib/store";
import { getLeaderboardUsers } from "lib/axios/requests/users/getLeaderboardUsers";

const headerBoxContainerStyle: SxProps = {
  paddingBottom: "1rem",
  overflow: "auto",
};

const ITEMS_PER_PAGE = 15;

const Home = () => {
  const usersContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [missingID] = useAtom(userHasNoID);
  const [_, setLoading] = useAtom(leaderboardLoading);
  const [__, setAllUsers] = useAtom(allLeaderboardUsers);
  const [___, setFilteredUsers] = useAtom(filteredLeaderboardUsers);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [loadingPagination, setLoadingPagination] = React.useState(false);

  const fetchAllBroodUsers = React.useCallback(
    async (page: number) => {
      if (!missingID) {
        setLoading(true);

        const users = await getLeaderboardUsers(
          currentPage * ITEMS_PER_PAGE,
          page * ITEMS_PER_PAGE
        );
        setCurrentPage(page);
        setAllUsers(users);
        setFilteredUsers(users);
        setLoading(false);
      }
    },
    // eslint-disable-next-line
    [currentPage, missingID]
  );

  const onScroll = React.useCallback(() => {
    console.log("Scrolling");
    if (usersContainerRef.current) {
      console.log("Scrolling");
      const { scrollTop, scrollHeight, clientHeight } =
        usersContainerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        console.log("Going to fetch");
        fetchAllBroodUsers(currentPage + 1);
      }
    }
  }, [fetchAllBroodUsers, currentPage]);

  React.useEffect(() => {
    if (!missingID) {
      fetchAllBroodUsers(1);
    }
    // eslint-disable-next-line
  }, [missingID]);

  return (
    <div onScroll={onScroll} ref={usersContainerRef}>
      <Box sx={headerBoxContainerStyle}>
        <Header title="The Club" isProfile={false} />
        <LeaderboardContent />
      </Box>
    </div>
  );
};

export default Home;
