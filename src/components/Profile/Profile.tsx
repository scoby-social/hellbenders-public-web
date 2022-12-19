import { Box, Grid, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  boxContainer,
  boxWrapper,
  mintFakeIDContentWrapper,
  mintFakeIDHeaderTitleWrapper,
  mintFakeIDHeaderWrapper,
  mintFakeIDTextDescription,
  mintFakeIDTitle,
} from "./styles";
import { UserCardProps } from "components/common/UserCard/types";
import UserCard from "components/common/UserCard/UserCard";
import PhotoBooth from "./PhotoBooth/PhotoBooth";

const val: UserCardProps = {
  id: "1",
  bio: "Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading. Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading.",
  externalLink: "launch.hellbenders.live/elias",
  avatar:
    "https://i.picsum.photos/id/417/200/200.jpg?hmac=urRppSmoZMSijmMMM_igfBcmbcTu_y285erBFfY7jE4",
  seniority: 123,
  brood: 50,
  royalties: 0,
  username: "Elias the super reader",
  isBroodLeader: true,
};

const Profile = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box sx={boxContainer}>
        <Grid container spacing={2} sx={boxWrapper}>
          <UserCard {...val} />
          <Grid item md={4} sm={8}>
            <Box sx={mintFakeIDHeaderWrapper}>
              <Box sx={mintFakeIDHeaderTitleWrapper}>
                <KeyboardArrowDownIcon sx={{ opacity: 0 }} />
                <Typography variant="h6">Mint your Fake ID</Typography>
                <KeyboardArrowDownIcon />
              </Box>
              <Box sx={mintFakeIDContentWrapper}>
                <Typography variant="h6" sx={mintFakeIDTitle}>
                  Join Elias's Unit
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
