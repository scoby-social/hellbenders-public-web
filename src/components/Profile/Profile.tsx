import { Box, Grid, Typography } from "@mui/material";
import { useAtom } from "jotai";

import UserCard from "components/common/UserCard/UserCard";
import { currentWallet, selectedLeader, userHasNoID } from "lib/store";

import {
  boxContainer,
  boxWrapper,
  connectWalletMessageWrapper,
  connectWalletText,
  emptyBroodText,
  emptyBroodWrapper,
} from "./styles";
import PhotoBooth from "./PhotoBooth/PhotoBooth";
import ConnectWalletButton from "components/common/ConnectWalletButton";
import FakeIDInfo from "./FakeIDInfo/FakeIDInfo";
import {
  allBroodUsers,
  broodLoading,
  filteredBroodUsers,
} from "lib/store/brood";
import FilterBar from "components/common/FilterBar/FilterBar";

const Profile = () => {
  const [wallet] = useAtom(currentWallet);
  const [missingID] = useAtom(userHasNoID);
  const [leader] = useAtom(selectedLeader);
  const [loading] = useAtom(broodLoading);
  const [allUsers] = useAtom(allBroodUsers);
  const [filteredUsers, setFilteredUsers] = useAtom(filteredBroodUsers);

  const renderComponent = () => {
    if (wallet !== "" && missingID) {
      return (
        <>
          <Box sx={boxContainer}>
            <Grid container spacing={2} sx={boxWrapper}>
              <UserCard {...leader} isBroodLeader />
              <FakeIDInfo username={leader.username} />
            </Grid>
          </Box>
          <PhotoBooth />
        </>
      );
    }

    if (wallet !== "" && !missingID) {
      return (
        <Box sx={boxContainer}>
          <Grid container spacing={2} sx={boxWrapper}>
            <UserCard {...leader} isBroodLeader />
            <FakeIDInfo username={leader.username} />
          </Grid>
          <Box sx={{ flex: 1 }}>
            <FilterBar
              allUsers={allUsers}
              setFilteredUsers={setFilteredUsers}
            />
            {filteredUsers.length === 0 ? (
              <Box sx={emptyBroodWrapper}>
                <Typography sx={emptyBroodText}>
                  Hmm, looks like Arcade hasn’t spawned.
                </Typography>
                <Typography sx={emptyBroodText}>
                  You can change that by minting a Fake ID right here.
                </Typography>
                <Typography sx={emptyBroodText}>LFG!</Typography>
              </Box>
            ) : (
              <Box>
                <Grid container spacing={4}>
                  {filteredUsers.map((val) => (
                    <UserCard key={val.id} {...val} isBroodLeader={false} />
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </Box>
      );
    }

    if (wallet === "") {
      return (
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
          >{`You've been recruited to join ${leader.username}'s brood in the Hellbenders Motorcycle Club`}</Typography>
          <Typography
            variant="h6"
            component="h6"
            sx={connectWalletText}
          >{`To get in quick, connect a wallet holding your Fake ID or use a burner wallet holding nothing at all. We don't need to be digging through your sh*t`}</Typography>
          <ConnectWalletButton primaryColor blackText />
        </Box>
      );
    }
  };

  return <Box>{renderComponent()}</Box>;
};

export default Profile;
