import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useAtom } from "jotai";

import UserCard from "components/common/UserCard/UserCard";
import ConnectWalletButton from "components/common/ConnectWalletButton";
import CountdownTimer from "components/common/CountdownTimer/CountdownTimer";
import HellbendersDescription from "components/common/HellbendersDescription";
import {
  currentUser,
  currentWallet,
  selectedLeader,
  userHasNoID,
} from "lib/store";
import {
  allBroodUsers,
  broodLoading,
  filteredBroodUsers,
} from "lib/store/brood";
import FilterBar from "components/common/FilterBar/FilterBar";
import { getUsersThatBelongsToBrood } from "lib/firebase/firestore/users/getBroodUsers";

import {
  boxContainer,
  boxWrapper,
  cardsContainer,
  connectWalletMessageWrapper,
  connectWalletText,
  emptyBroodText,
  emptyBroodWrapper,
  loaderWrapperStyles,
  profileContainer,
} from "./styles";
import PhotoBooth from "./PhotoBooth/PhotoBooth";
import { filterBroodUsers } from "./utils/filterBroodUsers";
import FakeIDInfo from "./FakeIDInfo/FakeIDInfo";

const Profile = () => {
  const [wallet] = useAtom(currentWallet);
  const [missingID] = useAtom(userHasNoID);
  const [user] = useAtom(currentUser);
  const [leader] = useAtom(selectedLeader);
  const [loading, setLoading] = useAtom(broodLoading);
  const [allUsers, setAllUsers] = useAtom(allBroodUsers);
  const [filteredUsers, setFilteredUsers] = useAtom(filteredBroodUsers);
  const isMyProfile = user.fakeID === leader?.fakeID && !leader.deceased;

  const renderEmptyBroodDescription = () => {
    if (!isMyProfile) {
      return (
        <Box sx={emptyBroodWrapper}>
          <Typography sx={emptyBroodText}>
            {`Hmm, looks like ${leader.username} hasn't spawned.`}
          </Typography>
          <Typography sx={emptyBroodText}>
            {`You can change that by minting a Fake ID right here.`}
          </Typography>
          <Typography sx={emptyBroodText}>LFG!</Typography>
        </Box>
      );
    }
    return (
      <Box sx={emptyBroodWrapper}>
        <Typography sx={emptyBroodText}>
          {`Hey ${leader.username}, your brood is looking kind of empty.`}
        </Typography>
        <Typography sx={emptyBroodText}>
          {`Change your Twitter PFP, share this link by DM and rep the club.`}
        </Typography>
        <Typography sx={emptyBroodText}>{`Let's get it, let's go!`}</Typography>
      </Box>
    );
  };

  const renderComponent = () => {
    if (wallet !== "" && missingID) {
      return (
        <>
          <Box sx={boxContainer}>
            <Grid container sx={boxWrapper}>
              <UserCard {...leader} isBroodLeader />
              <FakeIDInfo username={leader.username} />
            </Grid>
          </Box>
          <HellbendersDescription />
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
            <HellbendersDescription />
            <FilterBar
              allUsers={allUsers}
              setFilteredUsers={setFilteredUsers}
              isProfile
            />
            {filteredUsers.length === 0 &&
              !loading &&
              renderEmptyBroodDescription()}
            {filteredUsers.length > 0 && (
              <Box>
                <Grid sx={cardsContainer} container>
                  {filteredUsers.map((val) => (
                    <UserCard key={val.id} {...val} isBroodLeader={false} />
                  ))}
                </Grid>
              </Box>
            )}
            {filteredUsers.length === 0 && loading && (
              <Box sx={loaderWrapperStyles}>
                <CircularProgress sx={{ alignSelf: "center" }} />
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
          >{`To get in quick, connect a wallet holding your Fake ID or use a burner wallet holding nothing at all. We don't need to be digging through your sh*t.`}</Typography>
          <ConnectWalletButton primaryColor blackText />
        </Box>
      );
    }
  };

  const fetchUsers = React.useCallback(async () => {
    setLoading(true);
    const users = await getUsersThatBelongsToBrood(leader.fakeID);
    const filteredUsers = filterBroodUsers(users, leader);

    setAllUsers(filteredUsers);
    setFilteredUsers(filteredUsers);
    setLoading(false);
    // eslint-disable-next-line
  }, [leader]);

  React.useEffect(() => {
    if (wallet !== "" && !missingID) {
      setAllUsers([]);
      setFilteredUsers([]);
      fetchUsers();
    }
    // eslint-disable-next-line
  }, [wallet, missingID]);

  return (
    <Box sx={profileContainer}>
      {isMyProfile && <CountdownTimer />}
      {renderComponent()}
    </Box>
  );
};

export default Profile;
