import { Box, SxProps } from "@mui/material";
import { Header } from "components/Home/Header/Header";
import Profile from "components/Profile/Profile";

const headerBoxContainerStyle: SxProps = {
  backgroundColor: "rgba(217, 217, 217, 0.20)",
  paddingBottom: "1rem",
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { username: "elias" } }],
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

const ProfilePage = () => {
  return (
    <Box sx={headerBoxContainerStyle}>
      <Header />
      <Profile />
    </Box>
  );
};

export default ProfilePage;
