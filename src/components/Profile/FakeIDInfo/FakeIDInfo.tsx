import { Box, Grid, Typography } from "@mui/material";
import { useAtom } from "jotai";

import { userHasNoID } from "lib/store";

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
} from "./styles";
import { FakeIDInfoProps } from "./types";

const FakeIDInfo = ({ username }: FakeIDInfoProps) => {
  const [missingID] = useAtom(userHasNoID);

  const renderFakeIDAvailability = () => {
    return (
      <Box sx={availabilityContainer}>
        <Box sx={availabilityWrapper}>
          <Typography
            variant={missingID ? "subtitle2" : "subtitle1"}
            sx={mintFakeIDTextDescription}
          >
            Available
          </Typography>
          <Typography
            variant={missingID ? "subtitle2" : "subtitle1"}
            sx={mintFakeIDTextDescription}
          >
            232/3333
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

  return (
    <Grid item md={4} sm={8}>
      <Box sx={mintFakeIDHeaderWrapper}>
        <Box sx={mintFakeIDHeaderTitleWrapper}>
          <Typography variant="h6">
            {`To join ${username}'s brood, mint a Fake ID`}
          </Typography>
        </Box>
        <Box sx={mintFakeIDContentWrapper}>
          <Typography variant="h6" sx={mintFakeIDTitle}>
            {`Join ${username}'s Brood`}
          </Typography>
          {missingID ? (
            renderFakeIDAvailability()
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
                  <Typography variant="caption">60% DAO</Typography>
                </Box>
              </Box>
              <Box sx={royaltyWrapper}>
                <Box sx={rightRoyaltyTitle}>
                  <Typography variant="subtitle2">Trading</Typography>
                </Box>
                <Box sx={rightRoyaltyContent}>
                  <Typography variant="caption">85% Seller</Typography>
                  <Typography variant="caption">5% Promoter</Typography>
                  <Typography variant="caption">2% Scout</Typography>
                  <Typography variant="caption">1% Recruiter</Typography>
                  <Typography variant="caption">7% DAO</Typography>
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
