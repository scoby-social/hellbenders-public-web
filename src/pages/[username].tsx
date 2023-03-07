/* eslint-disable react-hooks/exhaustive-deps */
import { Box, SxProps } from "@mui/material";
import * as React from "react";
import { useAtom } from "jotai";

import { Header } from "components/common/Header/Header";
import Profile from "components/Profile/Profile";

import { getUserByUsername } from "lib/axios/requests/users/getUsers";
import { markUserAsDiseased } from "lib/axios/requests/users/markUserAsDiseased";
import { getNFTWithMetadata } from "lib/web3/common/getNFTWithMetadata";
import { selectedLeader, userDeceased } from "lib/store";

import { ProfilePageProps } from "../components/Profile/types";

const headerBoxContainerStyle: SxProps = {
  paddingBottom: "1rem",
};

interface ServerSidePropsParams {
  params: { username: string };
}

export async function getServerSideProps({ params }: ServerSidePropsParams) {
  const { username } = params;
  const user = await getUserByUsername(username);

  if (Object.keys(user).length === 0) return { notFound: true };

  return {
    props: {
      user,
    },
  };
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const [_, setSelectedLeader] = useAtom(selectedLeader);
  const [__, setDiseased] = useAtom(userDeceased);

  const checkIfLeaderHasFakeID = React.useCallback(async () => {
    try {
      await getNFTWithMetadata(user.fakeID);
    } catch (e: any) {
      if (e?.toString()?.includes("AccountNotFoundError")) {
        setDiseased(true);
        markUserAsDiseased(user._id);
        setSelectedLeader((prev) => ({ ...prev, deceased: true }));
      }
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const userDate = new Date(user.createdAt);
    userDate.setMinutes(userDate.getMinutes() + 5);
    const hasBeenRecenlyCreated = userDate > new Date();
    setSelectedLeader(user);
    if (!user.deceased && !hasBeenRecenlyCreated) {
      checkIfLeaderHasFakeID();
    } else {
      setDiseased(user.deceased);
    }
  }, [user]);

  return (
    <Box sx={headerBoxContainerStyle}>
      <Header title={`The ${user.username} Brood`} isProfile />
      <Profile />
    </Box>
  );
};

export default ProfilePage;
