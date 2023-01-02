import { Box, SxProps } from "@mui/material";
import { Header } from "components/Home/Header/Header";
import { LeaderboardContent } from "components/Home/LeaderboardContent/LeaderboardContent";

const headerBoxContainerStyle: SxProps = {
  backgroundColor: "rgba(217, 217, 217, 0.20)",
  paddingBottom: "1rem",
};

const Home = () => {
  return (
    <Box sx={headerBoxContainerStyle}>
      <Header title="Leaderboard" isProfile={false} />
      <LeaderboardContent />
    </Box>
  );
};

export default Home;
