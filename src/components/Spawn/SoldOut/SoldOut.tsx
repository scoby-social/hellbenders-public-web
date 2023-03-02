import { Box, Link, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import * as React from "react";

import DODGroupCard from "../DODGroupCard/DODGroupCard";
import {
  boldText,
  cardsContainer,
  spawnContainer,
  spawnLinks,
  spawnLinksWrapper,
  spawnsInfoWrapper,
  spawnTitleWrapper,
  spawnTradeText,
  spawnUnitWrapper,
  titleText,
} from "./styles";
import { Groups } from "../utils/types";
import { getGroupsWithData } from "../utils/getGroupsWithData";

const SoldOut = () => {
  const wallet = useWallet();
  const [groups, setGroups] = React.useState<Groups>({} as Groups);

  React.useEffect(() => {
    (async () => {
      const groupData = await getGroupsWithData(wallet, false);
      setGroups(groupData);
    })();
  }, []);

  return (
    <Box sx={spawnContainer}>
      <Box sx={spawnTitleWrapper}>
        <Typography variant="h2">{`Redeem your Spawn for a Hellbenders: DAO or DIE`}</Typography>
      </Box>

      <Box sx={spawnsInfoWrapper}>
        <Box>
          <Typography
            variant="subtitle1"
            sx={titleText}
          >{`Your Spawn`}</Typography>
          <Box sx={spawnUnitWrapper}>
            <Typography variant="subtitle2">{`Group 1:`}</Typography>
            <Typography variant="subtitle2">{`2`}</Typography>
          </Box>
          <Box sx={spawnUnitWrapper}>
            <Typography variant="subtitle2">{`Group 3:`}</Typography>
            <Typography variant="subtitle2">{`1`}</Typography>
          </Box>
          <Box sx={spawnUnitWrapper}>
            <Typography
              variant="subtitle2"
              sx={boldText}
            >{`Total:`}</Typography>
            <Typography variant="subtitle2" sx={boldText}>{`3`}</Typography>
          </Box>
        </Box>
        <Box sx={spawnLinksWrapper}>
          <Typography
            variant="subtitle1"
            sx={spawnTradeText}
          >{`You can trade your Spawn on...`}</Typography>
          <Link
            target="_blank"
            variant="subtitle2"
            sx={spawnLinks}
            href="https://magiceden.io/"
          >{`Magic Eden`}</Link>
          <Link
            target="_blank"
            variant="subtitle2"
            sx={spawnLinks}
            href="https://hyperspace.xyz/"
          >{`Hyperspace`}</Link>
          <Link
            target="_blank"
            variant="subtitle2"
            sx={spawnLinks}
            href="https://solsea.io/"
          >{`SolSea`}</Link>
        </Box>
      </Box>

      <Box sx={cardsContainer}>
        {Object.values(groups).map((group, index) => (
          <DODGroupCard totalOwned={1} key={index} {...group} />
        ))}
      </Box>
    </Box>
  );
};

export default SoldOut;
