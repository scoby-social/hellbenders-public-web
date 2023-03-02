import { Box, CircularProgress, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAtom } from "jotai";
import { userHasNoID } from "lib/store";
import * as React from "react";

import { getSpawnMintedCount } from "lib/web3/spawn/getSpawnSupply";
import { SpawnSupply } from "lib/web3/types/spawnSupply";

import GroupCard from "../GroupCard/GroupCard";
import { getGroupsWithData } from "../utils/getGroupsWithData";
import { Groups } from "../utils/types";
import {
  cardsContainer,
  loaderContainer,
  spawnContainer,
  spawnSubtitle,
  spawnTitleWrapper,
  supplyInfoContainer,
  supplyInfoItemWrapper,
} from "./styles";

const SUPPLY = 3333;

const SpawnMint = () => {
  const wallet = useWallet();
  const [missingID] = useAtom(userHasNoID);
  const [groups, setGroups] = React.useState<Groups>({} as Groups);
  const [totalMintedCount, setTotalMintedCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const getGroups = React.useCallback(async () => {
    setLoading(true);
    const groupsData = await getGroupsWithData(wallet, !missingID);
    setGroups(groupsData);
    setLoading(false);
  }, [missingID, wallet]);

  const getSupplyInfo = React.useCallback(async () => {
    const spawnSupply = await getSpawnMintedCount(wallet);
    const mintedCount =
      spawnSupply.black +
      spawnSupply.fake +
      spawnSupply.steel +
      spawnSupply.legendary +
      spawnSupply.gold +
      spawnSupply.open;

    setGroups((prevGroups) => {
      const newGroups = { ...prevGroups };

      for (const key in spawnSupply) {
        newGroups[key as keyof Groups].tokensMinted =
          spawnSupply[key as keyof SpawnSupply];
      }

      return newGroups;
    });

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
          {Object.values(groups).map((group, index) => (
            <GroupCard key={index} {...group} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SpawnMint;
