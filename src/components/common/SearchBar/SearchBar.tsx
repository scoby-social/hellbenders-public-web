import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import { useAtom } from "jotai";

import { searchTextFilter } from "lib/store/filters";

import { searchBarButton, searchBarInput, searchBarWrapper } from "./styles";

const SearchBar = () => {
  const [__, setSearchTextOnFilter] = useAtom(searchTextFilter);
  const [searchText, setSearchText] = React.useState("");

  const executeSearch = React.useCallback(() => {
    setSearchTextOnFilter(searchText);
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            executeSearch();
          }
        }}
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
