/* eslint-disable react-hooks/exhaustive-deps */
import { Box, SxProps } from "@mui/material";
import * as React from "react";
import { useAtom } from "jotai";

import { Header } from "components/Home/Header/Header";
import Profile from "components/Profile/Profile";

import { getUserByUsername } from "lib/firebase/firestore/users/getUsers";
import { selectedLeader } from "lib/store";

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

  return {
    props: {
      user,
    },
  };
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const [_, setSelectedLeader] = useAtom(selectedLeader);

  React.useEffect(() => {
    setSelectedLeader(user);
  }, [user]);

  return (
    <Box sx={headerBoxContainerStyle}>
      <Header title={`The ${user.username} Brood`} isProfile />
      <Profile />
    </Box>
  );
};

export default ProfilePage;
