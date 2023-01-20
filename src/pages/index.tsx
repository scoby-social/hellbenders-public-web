import { Box, SxProps } from "@mui/material";
import * as React from "react";

import { Header } from "components/Home/Header/Header";
import { LeaderboardContent } from "components/Home/LeaderboardContent/LeaderboardContent";
import { useAtom } from "jotai";
import {
  allLeaderboardUsers,
  filteredLeaderboardUsers,
  leaderboardLoading,
  userHasNoID,
} from "lib/store";
import { getLeaderboardUsers } from "lib/firebase/firestore/users/getLeaderboardUsers";

const headerBoxContainerStyle: SxProps = {
  paddingBottom: "1rem",
};

const Home = () => {
  const [missingID] = useAtom(userHasNoID);
  const [_, setLoading] = useAtom(leaderboardLoading);
  const [__, setAllUsers] = useAtom(allLeaderboardUsers);
  const [___, setFilteredUsers] = useAtom(filteredLeaderboardUsers);

  const fetchAllBroodUsers = React.useCallback(async () => {
    setLoading(true);
    const users = await getLeaderboardUsers();
    setAllUsers(users);
    setFilteredUsers(users);
    setLoading(false);
    // eslint-disable-next-line
  }, [missingID]);

  React.useEffect(() => {
    if (!missingID) {
      fetchAllBroodUsers();
    }
    // eslint-disable-next-line
  }, [missingID]);

  return (
    <Box sx={headerBoxContainerStyle}>
      <Header title="The Club" isProfile={false} />
      <LeaderboardContent />
    </Box>
  );
};

export default Home;
