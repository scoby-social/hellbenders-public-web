import { Avatar, Box, Divider, Grid, Link, Typography } from "@mui/material";
import {
  avatarStyles,
  avatarWrapper,
  cardContainer,
  cardContentBoxWrapper,
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
      height: "100%",
      md: 4,
      sm: 8,
      xs: 12,
    };
  }

  return;
};

const UserCard = ({
  id,
  username,
  bio,
  avatar,
  seniority,
  brood,
  amplifierRole,
  superpowerRole,
  royalties,
  isBroodLeader,
}: UserCardProps) => (
  <Grid
    sx={{ height: "100%" }}
    {...getResponsiveParamsForGrid(isBroodLeader)}
    item
    key={id}
  >
    <Box sx={cardContainer}>
      {isBroodLeader && (
        <Box sx={unitLeaderFlag}>
          <Typography variant="subtitle2">Brood Leader</Typography>
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
            {`${username} the ${amplifierRole} ${superpowerRole}`}
          </Typography>
          <Typography variant="caption" sx={defaultText}>
            {bio}
          </Typography>
          <Link
            href={`/${username}`}
          >{`www.hellbenders.world/${username}`}</Link>
          <Box sx={userRankWrapper}>
            <Typography variant="caption">{`Seniority: ${seniority}`}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="caption">{`Brood Size: ${brood}`}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="caption">{`Royalties: $${royalties.toFixed(
              2
            )}`}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  </Grid>
);

export default UserCard;
