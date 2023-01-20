import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import * as React from "react";

import {
  filterIconStyles,
  filtersBoxWrapperStyles,
  filterWrapperStyles,
} from "./styles";
import { FilterBarProps, FilterValue } from "./types";
import { filters } from "./utils";
import { User } from "lib/models/user";

const FilterBar = ({ allUsers, setFilteredUsers }: FilterBarProps) => {
  const [filtersState, setFiltersState] = React.useState(filters);

  const getFilterIconByValue = (value: FilterValue) => {
    switch (value) {
      case FilterValue.DESC:
        return <KeyboardArrowDownIcon sx={filterIconStyles} />;
      case FilterValue.ASC:
        return <KeyboardArrowUpIcon sx={filterIconStyles} />;
      case FilterValue.DEACTIVATED:
        return <></>;
      default:
        return <></>;
    }
  };

  const getNextFilterValue = (currentValue: FilterValue): FilterValue => {
    switch (currentValue) {
      case FilterValue.DEACTIVATED:
        return FilterValue.DESC;
      case FilterValue.DESC:
        return FilterValue.ASC;
      case FilterValue.ASC:
        return FilterValue.DEACTIVATED;
      default:
        return FilterValue.DEACTIVATED;
    }
  };

  const toggleFilter = (index: number, currentValue: FilterValue) => {
    setFiltersState((prev) => {
      const newFilterState = [...prev];
      newFilterState.forEach((val, idx) => {
        if (index === idx) {
          val.value = getNextFilterValue(currentValue);
          return;
        }

        val.value = FilterValue.DEACTIVATED;
      });

      return newFilterState;
    });
  };

  const filterUsers = React.useCallback(() => {
    let filtered = false;

    filtersState.forEach((val) => {
      const field = val.property as keyof User;
      if (val.value === FilterValue.ASC) {
        filtered = true;
        const newUsers = [...allUsers];
        newUsers.sort((a, b) => {
          if (a[field] > b[field]) {
            return -1;
          }

          if (a[field] < b[field]) {
            return 1;
          }

          return 0;
        });
        setFilteredUsers(newUsers);
      }

      if (val.value === FilterValue.DESC) {
        filtered = true;
        const newUsers = [...allUsers];
        newUsers.sort((a, b) => {
          if (a[field] < b[field]) {
            return -1;
          }

          if (a[field] > b[field]) {
            return 1;
          }

          return 0;
        });
        setFilteredUsers(newUsers);
      }
    });

    if (!filtered) setFilteredUsers(allUsers);

    // eslint-disable-next-line
  }, [allUsers, filtersState]);

  React.useEffect(() => {
    filterUsers();
    // eslint-disable-next-line
  }, [filtersState]);

  return (
    <Box sx={filtersBoxWrapperStyles}>
      {filtersState.map((filter, index) => (
        <Box
          onClick={() => toggleFilter(index, filter.value)}
          key={index}
          sx={filterWrapperStyles}
        >
          <Typography variant="body2">{filter.label}</Typography>
          {getFilterIconByValue(filter.value)}
        </Box>
      ))}
    </Box>
  );
};

export default FilterBar;
