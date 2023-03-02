import { Box, Link } from "@mui/material";
import { useAtom } from "jotai";

import { currentUser } from "lib/store";
import { link, linkWrapper } from "./styles";

const TopTabs = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [user] = useAtom(currentUser);
  return (
    <Box sx={linkWrapper}>
      {isLoggedIn && (
        <>
          <Link sx={link} href="/">
            The Club
          </Link>
          <Link sx={link} href={`/${user.username}`}>
            My Page
          </Link>
        </>
      )}
      <Link sx={link} target="_blank" href={`https://spawn.hellbenders.world`}>
        Mint a Spawn
      </Link>
    </Box>
  );
};

export default TopTabs;
