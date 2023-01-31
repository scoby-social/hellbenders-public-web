import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import * as React from "react";
import { useAtom } from "jotai";

import { User } from "lib/models/user";
import { usersByGen } from "lib/store/brood";

import {
  broodFiltersWrapper,
  filterIcon,
  filtersBoxWrapper,
  filterTabsWrapper,
  filterWrapper,
} from "./styles";
import {
  CheckboxProperty,
  FilterBarProps,
  FilterBarType,
  FilterValue,
} from "./types";
import { checkBoxes, filters } from "./utils";
import { AllGenerationValues } from "lib/firebase/firestore/users/types";

const FilterBar = ({
  allUsers,
  setFilteredUsers,
  isProfile,
}: FilterBarProps) => {
  const [allGenUsers] = useAtom(usersByGen);
  const [filtersState, setFiltersState] = React.useState(filters);
  const [checkboxState, setCheckboxState] = React.useState(checkBoxes);
  const [currentFilterIdx, setCurrentFilterIdx] = React.useState(0);

  const getFilterIconByValue = React.useCallback((value: FilterValue) => {
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
  }, []);

  const getNextFilterValue = React.useCallback(
    (currentValue: FilterValue): FilterValue => {
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
    },
    []
  );

  const toggleFilter = React.useCallback(
    (index: number, currentValue: FilterValue) => {
      const nextFilterValue = getNextFilterValue(currentValue);
      const currentFilter =
        nextFilterValue === FilterValue.DEACTIVATED ? 0 : index;
      setCurrentFilterIdx(currentFilter);

      setFiltersState((prev) => {
        const newFilterState = [...prev];
        newFilterState.forEach((val, idx) => {
          if (index === idx) {
            val.value = nextFilterValue;
            return;
          }

          val.value = FilterValue.DEACTIVATED;
        });

        return newFilterState;
      });
    },
    // eslint-disable-next-line
    []
  );

  const toggleCheckbox = React.useCallback(
    (index: number, checked: boolean) => {
      setCheckboxState((prev) => {
        const newCheckboxState = [...prev];
        newCheckboxState[index].checked = checked;
        return newCheckboxState;
      });
    },
    []
  );

  const filterUsers = React.useCallback(() => {
    let filtered = false;

    const newUsers = !isProfile ? [...allUsers] : [];

    if (isProfile && currentFilterIdx === 1) {
      checkboxState.forEach((val) => {
        if (val.checked) {
          newUsers.push(
            ...allGenUsers[val.property as unknown as keyof AllGenerationValues]
          );
        }
      });
    }

    filtersState.forEach((val) => {
      const field = val.property as keyof User;
      if (val.value === FilterValue.ASC) {
        filtered = true;
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
  }, [allUsers, filtersState, checkboxState]);

  const getTotalGenNumber = React.useCallback(
    (property: CheckboxProperty) => {
      return allGenUsers[property as unknown as keyof AllGenerationValues]
        .length;
    },
    [allGenUsers]
  );

  React.useEffect(() => {
    filterUsers();
    // eslint-disable-next-line
  }, [filtersState, checkboxState]);

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
      {isProfile && filters[currentFilterIdx].property === FilterBarType.BROOD && (
        <Box sx={broodFiltersWrapper}>
          {checkboxState.map((checkbox, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => toggleCheckbox(index, e.target.checked)}
                  checked={checkbox.checked}
                />
              }
              key={index}
              label={
                <Typography variant="subtitle2">
                  {checkbox.label}{" "}
                  <strong>{`(${getTotalGenNumber(checkbox.property)})`}</strong>
                </Typography>
              }
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FilterBar;
