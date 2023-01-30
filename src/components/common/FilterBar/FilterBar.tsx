import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import * as React from "react";

import {
  filterIcon,
  filtersBoxWrapper,
  filterTabsWrapper,
  filterWrapper,
} from "./styles";
import { FilterBarProps, FilterBarType, FilterValue } from "./types";
import { filters } from "./utils";
import { User } from "lib/models/user";

const FilterBar = ({
  allUsers,
  setFilteredUsers,
  isProfile,
}: FilterBarProps) => {
  const [filtersState, setFiltersState] = React.useState(filters);
  const [currentFilterIdx, setCurrentFilterIdx] = React.useState(0);

  const getFilterIconByValue = (value: FilterValue) => {
    switch (value) {
      case FilterValue.DESC:
        return <KeyboardArrowDownIcon sx={filterIcon} />;
      case FilterValue.ASC:
        return <KeyboardArrowUpIcon sx={filterIcon} />;
      case FilterValue.DEACTIVATED:
        return <></>;
      default:
        return <></>;
    }
  };

  const getNextFilterValue = (currentValue: FilterValue): FilterValue => {
    switch (currentValue) {
      case FilterValue.DEACTIVATED:
        return FilterValue.ASC;
      case FilterValue.DESC:
        return FilterValue.DEACTIVATED;
      case FilterValue.ASC:
        return FilterValue.DESC;
      default:
        return FilterValue.DEACTIVATED;
    }
  };

  const toggleFilter = (index: number, currentValue: FilterValue) => {
    setCurrentFilterIdx(index);
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
    <Box sx={filtersBoxWrapper}>
      <Box sx={filterTabsWrapper}>
        {filtersState.map((filter, index) => (
          <Box
            onClick={() => toggleFilter(index, filter.value)}
            key={index}
            sx={filterWrapper}
          >
            <Typography variant="body2">{filter.label}</Typography>
            {getFilterIconByValue(filter.value)}
          </Box>
        ))}
      </Box>
      {isProfile && filters[currentFilterIdx].property === FilterBarType.BROOD}
    </Box>
  );
};

export default FilterBar;
