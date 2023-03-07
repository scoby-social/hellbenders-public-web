import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import * as React from "react";
import { useAtom } from "jotai";

import { selectedSortFilter } from "lib/store/filters";
import { selectedLeader } from "lib/store";
import { AllGenerationValues } from "lib/axios/requests/users/types";
import { getBroodCount } from "lib/axios/requests/users/getBroodCount";

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
import { checkBoxes, filters, genByIndex } from "./utils";
import { selectedGenFilter } from "lib/store/brood";

const FilterBar = ({
  allUsers,
  setFilteredUsers,
  isProfile,
}: FilterBarProps) => {
  const [currentLeader] = useAtom(selectedLeader);
  const [_, setSortFilter] = useAtom(selectedSortFilter);
  const [__, setGenFilter] = useAtom(selectedGenFilter);
  const [filtersState, setFiltersState] = React.useState(filters);
  const [checkboxState, setCheckboxState] = React.useState(checkBoxes);
  const [currentFilterIdx, setCurrentFilterIdx] = React.useState(0);
  const [broodCount, setBroodCount] = React.useState({
    gen1: 0,
    gen2: 0,
    gen3: 0,
    gen4: 0,
  });

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

      setGenFilter((prev) => {
        const newFilters = { ...prev };
        newFilters[genByIndex[index]] = checked;
        return newFilters;
      });
    },
    [setGenFilter]
  );

  const filterUsers = React.useCallback(() => {
    const defaultFilter = { name: "seniority", value: -1 };
    const filter = { ...defaultFilter };

    filtersState.forEach((val) => {
      if (val.value !== FilterValue.DEACTIVATED) {
        filter.name = val.property;
        filter.value = val.value;
      }
    });

    setSortFilter(filter);

    // eslint-disable-next-line
  }, [allUsers, filtersState, checkboxState]);

  const getBroodTotalCount = React.useCallback(async () => {
    const res = await getBroodCount(currentLeader.fakeID);

    setBroodCount(res);
    // eslint-disable-next-line
  }, [currentLeader.fakeID]);

  const getTotalGenNumber = React.useCallback(
    (property: CheckboxProperty) => {
      return broodCount[property as unknown as keyof AllGenerationValues];
    },
    [broodCount]
  );

  React.useEffect(() => {
    filterUsers();
    // eslint-disable-next-line
  }, [filtersState, checkboxState]);

  React.useEffect(() => {
    if (!currentLeader.fakeID) return;
    getBroodTotalCount();
  }, [getBroodTotalCount, currentLeader.fakeID]);

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
