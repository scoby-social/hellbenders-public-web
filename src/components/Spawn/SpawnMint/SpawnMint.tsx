import { Box, Typography } from "@mui/material";
import GroupCard from "../GroupCard/GroupCard";
import { groups } from "../utils/groups";
import {
  cardsContainer,
  spawnContainer,
  spawnSubtitle,
  spawnTitleWrapper,
  supplyInfoContainer,
  supplyInfoItemWrapper,
} from "./styles";

const SpawnMint = () => (
  <Box sx={spawnContainer}>
    <Box sx={spawnTitleWrapper}>
      <Typography variant="h2">{`Mint your Hellbenders Spawn`}</Typography>
      <Typography
        sx={spawnSubtitle}
        variant="subtitle2"
      >{`In the Available Groups Below`}</Typography>
    </Box>

    <Box sx={supplyInfoContainer}>
      <Box sx={supplyInfoItemWrapper}>
        <Typography variant="h2">203</Typography>
        <Typography variant="subtitle2">Minted</Typography>
      </Box>

      <Box sx={supplyInfoItemWrapper}>
        <Typography variant="h2">1969</Typography>
        <Typography variant="subtitle2">Supply</Typography>
      </Box>

      <Box sx={supplyInfoItemWrapper}>
        <Typography variant="h2">1766</Typography>
        <Typography variant="subtitle2">Available</Typography>
      </Box>
    </Box>

    <Box sx={cardsContainer}>
      {groups.map((group, index) => (
        <GroupCard key={index} {...group} />
      ))}
    </Box>
  </Box>
);

export default SpawnMint;
