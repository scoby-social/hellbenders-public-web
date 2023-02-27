import { Box, Link, Typography } from "@mui/material";
import { useAtom } from "jotai";
import * as React from "react";

import { currentWallet } from "lib/store";
import NotConnectedWallet from "components/common/NotConnectedWallet/NotConnectedWallet";
import CountdownTimer from "components/common/CountdownTimer/CountdownTimer";

import {
  finishedMintContainer,
  finishedMintTitle,
  finishedMintWrapper,
  mintingStartText,
  notStartedInfoWrapper,
  spawnLinks,
} from "./styles";
import SoldOut from "./SoldOut/SoldOut";
import SpawnMint from "./SpawnMint/SpawnMint";

const Spawn = () => {
  const [soldOut, setSoldOut] = React.useState(false);
  const [started, setStarted] = React.useState(true);
  const [finished, setFinished] = React.useState(true);
  const [wallet] = useAtom(currentWallet);

  const renderComponent = () => {
    if (finished) {
      return (
        <Box sx={finishedMintContainer}>
          <Box sx={finishedMintWrapper}>
            <Typography
              sx={finishedMintTitle}
              variant="subtitle1"
            >{`Sorry, you ain’t got no Spawn. You can buy‘em on...`}</Typography>
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
      );
    }

    if (!started) {
      return (
        <Box sx={notStartedInfoWrapper}>
          <Typography variant="subtitle1">{`Hold Your Horses!`}</Typography>
          <Typography
            variant="h4"
            sx={mintingStartText}
          >{`Hellbenders Spawn minting starts in`}</Typography>
          <CountdownTimer />
          <Typography variant="subtitle1">{`3/3/23 at 3:33:33 pm EST`}</Typography>
        </Box>
      );
    }

    if (wallet !== "") {
      return (
        <NotConnectedWallet
          title={`To get in quick, connect with a wallet holding only your`}
          subtitle={`Fake ID, Redlist Tokens or nothing at all.`}
          footer={`We don’t want to be digging through your sh*t.`}
        />
      );
    }

    if (soldOut) {
      return <SoldOut />;
    }

    return <SpawnMint />;
  };

  return renderComponent();
};

export default Spawn;
