import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import {
  avatarStyles,
  avatarWrapper,
  cardContainer,
  cardContentBoxWrapper,
  cardLinkText,
  cardTitleText,
  contentCard,
  defaultText,
  unitLeaderFlag,
  userRankWrapper,
} from "./styles";
import { UserCardProps } from "./types";

const getResponsiveParamsForGrid = (isLeader: boolean) => {
  if (isLeader) {
    return {
      md: 4,
      sm: 8,
      xs: 12,
    };
  }

  return {
    xs: 12,
    md: 6,
    lg: 4,
  };
};

const UserCard = ({
  id,
  username,
  bio,
  externalLink,
  avatar,
  seniority,
  brood,
  amplifier_role,
  superpower_role,
  royalties,
  isBroodLeader,
}: UserCardProps) => (
  <Grid
    sx={{ height: "100%" }}
    item
    {...getResponsiveParamsForGrid(isBroodLeader)}
    key={id}
  >
    <Box sx={cardContainer}>
      {isBroodLeader && (
        <Box sx={unitLeaderFlag}>
          <Typography>Brood Leader</Typography>
        </Box>
      )}
      <Box sx={contentCard(isBroodLeader)}>
        <Box sx={avatarWrapper}>
          <Avatar
            alt={`${username}'s profile image`}
            src={avatar}
            sx={avatarStyles}
          />
        </Box>
        <Box sx={cardContentBoxWrapper}>
          <Typography variant="h6" sx={cardTitleText}>
            {`${username} The ${amplifier_role} ${superpower_role}`}
          </Typography>
          <Typography variant="caption" sx={defaultText}>
            {bio}
          </Typography>
          <Typography sx={cardLinkText} variant="caption">
            {externalLink}
          </Typography>
          <Box sx={userRankWrapper}>
            <Typography variant="caption">{`Seniority: ${seniority}`}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="caption">{`Brood: ${brood}`}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="caption">{`Royalties: $${royalties}`}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  </Grid>
);

export default UserCard;
