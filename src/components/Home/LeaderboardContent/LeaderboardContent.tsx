import { Box, Grid, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import UserCard from "components/common/UserCard/UserCard";
import { UserCardProps } from "components/common/UserCard/types";

import {
  contentContainerStyles,
  filterIconStyles,
  filtersBoxWrapperStyles,
  filterWrapperStyles,
} from "./styles";

const mockCardInformation: UserCardProps[] = [
  {
    id: "1",
    username: "Elias the super reader",
    bio: "Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading. Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading.",
    externalLink: "launch.hellbenders.live/elias",
    avatar:
      "https://i.picsum.photos/id/417/200/200.jpg?hmac=urRppSmoZMSijmMMM_igfBcmbcTu_y285erBFfY7jE4",
    seniority: 123,
    brood: 50,
    royalties: 0,
    isBroodLeader: false,
  },
  {
    id: "2",
    username: "Elias the super reader",
    bio: "Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading. Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading.",
    externalLink: "launch.hellbenders.live/elias",
    avatar:
      "https://i.picsum.photos/id/417/200/200.jpg?hmac=urRppSmoZMSijmMMM_igfBcmbcTu_y285erBFfY7jE4",
    seniority: 123,
    brood: 50,
    royalties: 0,
    isBroodLeader: false,
  },
  {
    id: "3",
    username: "Elias the super reader",
    bio: "Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading. Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading.",
    externalLink: "launch.hellbenders.live/elias",
    avatar:
      "https://i.picsum.photos/id/417/200/200.jpg?hmac=urRppSmoZMSijmMMM_igfBcmbcTu_y285erBFfY7jE4",
    seniority: 123,
    brood: 50,
    royalties: 0,
    isBroodLeader: false,
  },
  {
    id: "4",
    username: "Elias the super reader",
    bio: "Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading. Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading.",
    externalLink: "launch.hellbenders.live/elias",
    avatar:
      "https://i.picsum.photos/id/417/200/200.jpg?hmac=urRppSmoZMSijmMMM_igfBcmbcTu_y285erBFfY7jE4",
    seniority: 123,
    brood: 50,
    royalties: 0,
    isBroodLeader: false,
  },
  {
    id: "5",
    username: "Elias the super reader",
    bio: "Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading. Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading.",
    externalLink: "launch.hellbenders.live/elias",
    avatar:
      "https://i.picsum.photos/id/417/200/200.jpg?hmac=urRppSmoZMSijmMMM_igfBcmbcTu_y285erBFfY7jE4",
    seniority: 123,
    brood: 50,
    royalties: 0,
    isBroodLeader: false,
  },
  {
    id: "6",
    username: "Elias the super reader",
    bio: "Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading. Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading.",
    externalLink: "launch.hellbenders.live/elias",
    avatar:
      "https://i.picsum.photos/id/417/200/200.jpg?hmac=urRppSmoZMSijmMMM_igfBcmbcTu_y285erBFfY7jE4",
    seniority: 123,
    brood: 50,
    royalties: 0,
    isBroodLeader: false,
  },
  {
    id: "7",
    username: "Elias the super reader",
    bio: "Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading. Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading.",
    externalLink: "launch.hellbenders.live/elias",
    avatar:
      "https://i.picsum.photos/id/417/200/200.jpg?hmac=urRppSmoZMSijmMMM_igfBcmbcTu_y285erBFfY7jE4",
    seniority: 123,
    brood: 50,
    royalties: 0,
    isBroodLeader: false,
  },
  {
    id: "8",
    username: "Elias the super reader",
    bio: "Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading. Hello world 🤯🚀, space for reading entertainment in a piece of internet, enjoyable reading.",
    externalLink: "launch.hellbenders.live/elias",
    avatar:
      "https://i.picsum.photos/id/417/200/200.jpg?hmac=urRppSmoZMSijmMMM_igfBcmbcTu_y285erBFfY7jE4",
    seniority: 123,
    brood: 50,
    royalties: 0,
    isBroodLeader: false,
  },
];

export const LeaderboardContent = () => {
  return (
    <Box sx={contentContainerStyles}>
      <Box sx={filtersBoxWrapperStyles}>
        <Box sx={filterWrapperStyles}>
          <Typography>Seniority</Typography>
          <KeyboardArrowDownIcon sx={filterIconStyles} />
        </Box>
        <Box sx={filterWrapperStyles}>
          <Typography>Brood</Typography>
          <KeyboardArrowDownIcon sx={filterIconStyles} />
        </Box>
        <Box sx={filterWrapperStyles}>
          <Typography>Royalties</Typography>
          <KeyboardArrowDownIcon sx={filterIconStyles} />
        </Box>
      </Box>
      <Box>
        <Grid container spacing={4}>
          {mockCardInformation.map((val) => (
            <UserCard key={val.id} {...val} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
