/* eslint-disable react-hooks/exhaustive-deps */
import { Box, SxProps } from "@mui/material";
import * as React from "react";
import { useAtom } from "jotai";

import { Header } from "components/Home/Header/Header";
import Profile from "components/Profile/Profile";

import { getUserByUsername } from "lib/firebase/firestore/users/getUsers";
import { getUsersForStaticPaths } from "lib/firebase/firestore/users/getUsersForStaticPaths";
import { selectedLeader } from "lib/store";

import { ProfilePageProps } from "../../components/Profile/types";

const headerBoxContainerStyle: SxProps = {
  backgroundColor: "rgba(217, 217, 217, 0.20)",
  paddingBottom: "1rem",
};

interface StaticPathParam {
  params: { username: string };
}

export async function getStaticPaths() {
  const allUsers = await getUsersForStaticPaths();

  const allParams = allUsers.map((value) => {
    return { params: { username: value } };
  });

  return {
    paths: [...allParams],
    fallback: false,
  };
}

export async function getStaticProps({ params }: StaticPathParam) {
  const user = await getUserByUsername(params.username);

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
      <Header title={`${user.username}'s Brood`} isProfile />
      <Profile />
    </Box>
  );
};

export default ProfilePage;
