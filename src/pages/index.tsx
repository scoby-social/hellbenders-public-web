import { Box, SxProps } from "@mui/material";
import * as React from "react";
import { useAtom } from "jotai";

import { Header } from "components/common/Header/Header";
import { LeaderboardContent } from "components/Home/LeaderboardContent/LeaderboardContent";
import {
  allLeaderboardUsers,
  currentWallet,
  filteredLeaderboardUsers,
  leaderboardLoading,
  userHasNoID,
} from "lib/store";
import { getLeaderboardUsers } from "lib/axios/requests/users/getLeaderboardUsers";

const headerBoxContainerStyle: SxProps = {
  paddingBottom: "1rem",
  overflow: "auto",
};

const Home = () => {
  const [missingID] = useAtom(userHasNoID);
  const [wallet] = useAtom(currentWallet);
  const [_, setLoading] = useAtom(leaderboardLoading);
  const [__, setAllUsers] = useAtom(allLeaderboardUsers);
  const [___, setFilteredUsers] = useAtom(filteredLeaderboardUsers);

  const fetchAllBroodUsers = React.useCallback(
    async () => {
      if (!missingID && wallet !== "") {
        setLoading(true);

        const users = await getLeaderboardUsers(0, 15);
        setAllUsers(users);
        setFilteredUsers(users);
        setLoading(false);
      }
    },
    // eslint-disable-next-line
    [missingID, wallet]
  );

  React.useEffect(() => {
    if (!missingID && wallet !== "") {
      fetchAllBroodUsers();
    }
    // eslint-disable-next-line
  }, [missingID, wallet]);

  return (
    <div>
      <Box sx={headerBoxContainerStyle}>
        <Header title="The Club" isProfile={false} />
        <LeaderboardContent />
      </Box>
    </div>
  );
};

export default Home;
