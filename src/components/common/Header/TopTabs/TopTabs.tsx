import { Box, Link } from "@mui/material";
import { useAtom } from "jotai";

import { currentUser } from "lib/store";
import { link, linkWrapper } from "./styles";

const TopTabs = () => {
  const [user] = useAtom(currentUser);
  return (
    <Box sx={linkWrapper}>
      <Link sx={link} href="/">
        The Club
      </Link>
      <Link sx={link} href={`/${user.username}`}>
        My Page
      </Link>
    </Box>
  );
};

export default TopTabs;
