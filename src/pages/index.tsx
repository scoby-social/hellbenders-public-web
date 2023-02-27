import { Box, SxProps } from "@mui/material";
import * as React from "react";
import { useAtom } from "jotai";

import { Header } from "components/common/Header/Header";
import { LeaderboardContent } from "components/Home/LeaderboardContent/LeaderboardContent";
import Spawn from "components/Spawn/Spawn";
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

export async function getServerSideProps({ req }: any) {
  const subdomain = req.headers.host.split(".")[0];

  return {
    props: {
      spawn: subdomain === "spawn",
    },
  };
}

const Home = ({ spawn }: any) => {
  const [missingID] = useAtom(userHasNoID);
  const [wallet] = useAtom(currentWallet);
  const [_, setLoading] = useAtom(leaderboardLoading);
  const [__, setAllUsers] = useAtom(allLeaderboardUsers);
  const [___, setFilteredUsers] = useAtom(filteredLeaderboardUsers);

  const headerTitle = spawn ? "Spawn" : "The Club";

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
        <Header title={headerTitle} isProfile={false} />
        {spawn ? <Spawn /> : <LeaderboardContent />}
      </Box>
    </div>
  );
};

export default Home;
