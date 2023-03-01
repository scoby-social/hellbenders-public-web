import { Box, CircularProgress, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAtom } from "jotai";
import { userHasNoID } from "lib/store";
import { getSpawnMintedCount } from "lib/web3/spawn/getSpawnSupply";
import * as React from "react";

import GroupCard from "../GroupCard/GroupCard";
import { getGroupsWithData } from "../utils/getGroupsWithData";
import { Group } from "../utils/types";
import {
  cardsContainer,
  loaderContainer,
  spawnContainer,
  spawnSubtitle,
  spawnTitleWrapper,
  supplyInfoContainer,
  supplyInfoItemWrapper,
} from "./styles";

const SUPPLY = 1969;

const SpawnMint = () => {
  const wallet = useWallet();
  const [missingID] = useAtom(userHasNoID);
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [totalMintedCount, setTotalMintedCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const getGroups = React.useCallback(async () => {
    setLoading(true);
    const groupsData = await getGroupsWithData(wallet, !missingID);
    setGroups(groupsData);
    setLoading(false);
  }, [missingID, wallet]);

  const getSupplyInfo = React.useCallback(async () => {
    const data = await getSpawnMintedCount(wallet);
    const mintedCount =
      data.black +
      data.fake +
      data.steel +
      data.legendary +
      data.gold +
      data.open;

    setTotalMintedCount(mintedCount);
  }, [wallet]);

  React.useEffect(() => {
    getGroups();
  }, [wallet, getGroups, missingID]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      getSupplyInfo();
    }, 5000);

    return () => clearInterval(interval);
  }, [getSupplyInfo]);

  return (
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
          <Typography variant="h2">{totalMintedCount}</Typography>
          <Typography variant="subtitle2">Minted</Typography>
        </Box>

        <Box sx={supplyInfoItemWrapper}>
          <Typography variant="h2">{SUPPLY}</Typography>
          <Typography variant="subtitle2">Supply</Typography>
        </Box>

        <Box sx={supplyInfoItemWrapper}>
          <Typography variant="h2">{SUPPLY - totalMintedCount}</Typography>
          <Typography variant="subtitle2">Available</Typography>
        </Box>
      </Box>

      {loading ? (
        <Box sx={loaderContainer}>
          <CircularProgress size={"3vmax"} color="primary" />
        </Box>
      ) : (
        <Box sx={cardsContainer}>
          {groups.map((group, index) => (
            <GroupCard key={index} {...group} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SpawnMint;
