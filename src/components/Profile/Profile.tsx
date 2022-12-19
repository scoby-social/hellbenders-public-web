import { Box, Grid, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAtom } from "jotai";

import UserCard from "components/common/UserCard/UserCard";
import { selectedLeader } from "lib/store";

import {
  boxContainer,
  boxWrapper,
  mintFakeIDContentWrapper,
  mintFakeIDHeaderTitleWrapper,
  mintFakeIDHeaderWrapper,
  mintFakeIDTextDescription,
  mintFakeIDTitle,
} from "./styles";
import PhotoBooth from "./PhotoBooth/PhotoBooth";

const Profile = () => {
  const [leader] = useAtom(selectedLeader);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box sx={boxContainer}>
        <Grid container spacing={2} sx={boxWrapper}>
          <UserCard {...leader} isBroodLeader />
          <Grid item md={4} sm={8}>
            <Box sx={mintFakeIDHeaderWrapper}>
              <Box sx={mintFakeIDHeaderTitleWrapper}>
                <KeyboardArrowDownIcon sx={{ opacity: 0 }} />
                <Typography variant="h6">Mint your Fake ID</Typography>
                <KeyboardArrowDownIcon />
              </Box>
              <Box sx={mintFakeIDContentWrapper}>
                <Typography variant="h6" sx={mintFakeIDTitle}>
                  {`Join ${leader.username}'s Brood`}
                </Typography>
                <Typography sx={mintFakeIDTextDescription}>
                  You’re already holding a fake ID in your wallet. If you want
                  to mint a new one, connect with an empty wallet.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <PhotoBooth />
      </Box>
    </Box>
  );
};

export default Profile;
