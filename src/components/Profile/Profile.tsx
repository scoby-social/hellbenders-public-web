import { Box, Grid, Typography } from "@mui/material";
import { useAtom } from "jotai";

import UserCard from "components/common/UserCard/UserCard";
import { currentWallet, selectedLeader } from "lib/store";

import {
  boxContainer,
  boxWrapper,
  connectWalletMessageWrapper,
  connectWalletText,
  mintFakeIDContentWrapper,
  mintFakeIDHeaderTitleWrapper,
  mintFakeIDHeaderWrapper,
  mintFakeIDTextDescription,
  mintFakeIDTitle,
} from "./styles";
import PhotoBooth from "./PhotoBooth/PhotoBooth";
import ConnectWalletButton from "components/common/ConnectWalletButton";

const Profile = () => {
  const [wallet] = useAtom(currentWallet);
  const [leader] = useAtom(selectedLeader);

  return (
    <Box sx={{ minHeight: "50vh" }}>
      {wallet !== "" ? (
        <>
          <Box sx={boxContainer}>
            <Grid container spacing={2} sx={boxWrapper}>
              <UserCard {...leader} isBroodLeader />
              <Grid item md={4} sm={8}>
                <Box sx={mintFakeIDHeaderWrapper}>
                  <Box sx={mintFakeIDHeaderTitleWrapper}>
                    <Typography align="center" variant="h6">
                      {`To join ${leader.username}'s brood, mint a Fake ID`}
                    </Typography>
                  </Box>
                  <Box sx={mintFakeIDContentWrapper}>
                    <Typography variant="h6" sx={mintFakeIDTitle}>
                      {`Join ${leader.username}'s Brood`}
                    </Typography>
                    <Typography sx={mintFakeIDTextDescription}>
                      You’re already holding a fake ID in your wallet. If you
                      want to mint a new one, connect with an empty wallet.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <PhotoBooth />
        </>
      ) : (
        <Box sx={connectWalletMessageWrapper}>
          <Typography
            variant="h6"
            component="h6"
            sx={connectWalletText}
          >{`Congratulations!`}</Typography>
          <Typography
            variant="h6"
            component="h6"
            sx={connectWalletText}
          >{`You've been recluted to join ${leader.username}'s brood in the Hellbenders Motorcycle Club`}</Typography>
          <Typography
            variant="h6"
            component="h6"
            sx={connectWalletText}
          >{`To get in quick, connect a wallet holding your Fake ID or use a burner wallet holding nothing at all. We don't need to be digging through your sh*t`}</Typography>
          <ConnectWalletButton primaryColor blackText />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
