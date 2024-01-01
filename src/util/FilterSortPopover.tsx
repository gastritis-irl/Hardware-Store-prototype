import React from 'react';
import { Button, Popover, SelectChangeEvent } from '@mui/material';
import FilterSort from './FilterSort';

type FilterSortPopoverProps = {
  open: boolean;
  anchorEl: null | HTMLElement;
  handlePopoverOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handlePopoverClose: () => void;
  orderBy: string;
  direction: string;
  handleOrderChange: (event: SelectChangeEvent) => void;
  handleDirectionChange: (event: SelectChangeEvent) => void;
  handleFilter: (mPrice: number, maPrice: number, tSearch: string) => void;
};

function FilterSortPopover({
  open,
  anchorEl,
  handlePopoverOpen,
  handlePopoverClose,
  orderBy,
  direction,
  handleOrderChange,
  handleDirectionChange,
  handleFilter,
}: FilterSortPopoverProps) {
  return (
    <>
      <Button onClick={handlePopoverOpen} color="primary">
        Filter and Sort
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <FilterSort
          orderBy={orderBy}
          direction={direction}
          handleOrderChange={handleOrderChange}
          handleDirectionChange={handleDirectionChange}
          handleFilter={handleFilter}
        />
      </Popover>
    </>
  );
}

export default FilterSortPopover;
