import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import { useAtom } from "jotai";

import { allLeaderboardUsers, filteredLeaderboardUsers } from "lib/store";

import { searchBarButton, searchBarInput, searchBarWrapper } from "./styles";

const SearchBar = () => {
  const [allUsers] = useAtom(allLeaderboardUsers);
  const [_, setFilteredUsers] = useAtom(filteredLeaderboardUsers);
  const [searchText, setSearchText] = React.useState("");

  const executeSearch = React.useCallback(() => {
    if (searchText === "") {
      setFilteredUsers(allUsers);
      return;
    }

    const filteredUsers = allUsers.filter((val) => {
      const fullName = `${val.username} The ${val.amplifierRole} ${val.superpowerRole}`;

      return fullName.includes(searchText);
    });

    setFilteredUsers(filteredUsers);

    // eslint-disable-next-line
  }, [searchText]);

  return (
    <Box sx={searchBarWrapper}>
      <Button
        onClick={executeSearch}
        color="primary"
        variant="contained"
        sx={searchBarButton}
      >
        <SearchIcon />
        Search
      </Button>
      <TextField
        variant="standard"
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Superpower"
        sx={searchBarInput}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Box>
  );
};

export default SearchBar;
