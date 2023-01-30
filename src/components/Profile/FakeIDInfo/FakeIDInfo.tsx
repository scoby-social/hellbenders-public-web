import { Box, Grid, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAtom } from "jotai";
import * as React from "react";

import { userHasNoID } from "lib/store";
import { getPoolMintedCount } from "lib/web3/getPoolMintedCount";

import {
  availabilityContainer,
  availabilityWrapper,
  leftRoyaltyContent,
  leftRoyaltyTitle,
  mintFakeIDContentWrapper,
  mintFakeIDHeaderTitleWrapper,
  mintFakeIDHeaderWrapper,
  mintFakeIDTextDescription,
  mintFakeIDTitle,
  rightRoyaltyContent,
  rightRoyaltyTitle,
  royaltiesContainer,
  royaltyShareContainer,
  royaltyShareTitle,
  royaltyWrapper,
  tooltip,
} from "./styles";
import { FakeIDInfoProps } from "./types";

const FakeIDInfo = ({ username }: FakeIDInfoProps) => {
  const wallet = useWallet();
  const [missingID] = useAtom(userHasNoID);

  const [mintedCount, setMintedCount] = React.useState(0);

  const renderFakeIDAvailability = () => {
    return (
      <Box sx={availabilityContainer}>
        <Box sx={availabilityWrapper}>
          <Typography
            variant={missingID ? "subtitle2" : "subtitle1"}
            sx={mintFakeIDTextDescription}
          >
            {`ID's minted`}
          </Typography>
          <Typography
            variant={missingID ? "subtitle2" : "subtitle1"}
            sx={mintFakeIDTextDescription}
          >
            {mintedCount}
          </Typography>
        </Box>
        <Box sx={availabilityWrapper}>
          <Typography
            variant={missingID ? "subtitle2" : "subtitle1"}
            sx={mintFakeIDTextDescription}
          >
            Price
          </Typography>
          <Typography
            variant={missingID ? "subtitle2" : "subtitle1"}
            sx={mintFakeIDTextDescription}
          >
            6.66 USDC
          </Typography>
        </Box>
      </Box>
    );
  };

  React.useEffect(() => {
    getPoolMintedCount(wallet).then((res) => setMintedCount(res));
  }, [wallet]);

  return (
    <Grid flexBasis={"100%"} item md={4} sm={8}>
      <Box sx={mintFakeIDHeaderWrapper}>
        <Box sx={mintFakeIDHeaderTitleWrapper}>
          <Typography variant="h6">
            {`To join ${username}'s brood, mint a Fake ID`}
          </Typography>
          <Tooltip
            arrow
            sx={tooltip}
            title="With your Hellbenders Fake ID, we can produce a fake passport and driver's license. When minted, the Fake ID will be a permanent record of your enrollment in the club and set your status as an outlaw to society. Please consider carefully how you would like to be represented.... rest is the same."
          >
            <InfoIcon />
          </Tooltip>
        </Box>
        <Box sx={mintFakeIDContentWrapper}>
          <Typography variant="h6" sx={mintFakeIDTitle}>
            {`Join ${username}'s Brood`}
          </Typography>
          {missingID ? (
            <Box sx={availabilityContainer}>
              <Box sx={availabilityWrapper}>
                <Typography
                  variant={missingID ? "subtitle2" : "subtitle1"}
                  sx={mintFakeIDTextDescription}
                >
                  Price
                </Typography>
                <Typography
                  variant={missingID ? "subtitle2" : "subtitle1"}
                  sx={mintFakeIDTextDescription}
                >
                  6.66 USDC
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="subtitle2" sx={mintFakeIDTextDescription}>
              You’re already holding a fake ID in your wallet. If you want to
              mint a new one, connect with an empty wallet.
            </Typography>
          )}
        </Box>
        {missingID && (
          <Box sx={royaltyShareContainer}>
            <Typography variant="h6" sx={royaltyShareTitle}>
              Royalty Share
            </Typography>
            <Box sx={royaltiesContainer}>
              <Box sx={royaltyWrapper}>
                <Box sx={leftRoyaltyTitle}>
                  <Typography variant="subtitle2">Minting</Typography>
                </Box>
                <Box sx={leftRoyaltyContent}>
                  <Typography variant="caption">20% Promoter</Typography>
                  <Typography variant="caption">10% Scout</Typography>
                  <Typography variant="caption">7% Recruiter</Typography>
                  <Typography variant="caption">3% OG</Typography>
                  <Typography variant="caption">60% Club</Typography>
                </Box>
              </Box>
              <Box sx={royaltyWrapper}>
                <Box sx={rightRoyaltyTitle}>
                  <Typography variant="subtitle2">Trading</Typography>
                </Box>
                <Box sx={rightRoyaltyContent}>
                  <Typography variant="caption">85% Enjoyer</Typography>
                  <Typography variant="caption">5% Promoter</Typography>
                  <Typography variant="caption">2% Scout</Typography>
                  <Typography variant="caption">1% Recruiter</Typography>
                  <Typography variant="caption">7% Club</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      {!missingID && renderFakeIDAvailability()}
    </Grid>
  );
};

export default FakeIDInfo;
