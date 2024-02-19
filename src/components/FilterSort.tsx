import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import HardwareFilter from './HardwareFilter';

type FilterSortComponentProps = {
  orderBy: string;
  direction: string;
  // minPrice: number | undefined;
  // maxPrice: number | undefined;
  // textSearch: string;
  handleOrderChange: (event: SelectChangeEvent) => void;
  handleDirectionChange: (event: SelectChangeEvent) => void;
  handleFilter: (mPrice: number, maPrice: number, tSearch: string, category: string) => void;
};

function FilterSort({
  orderBy,
  direction,
  handleOrderChange,
  handleDirectionChange,
  handleFilter,
}: FilterSortComponentProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        padding: '1rem',
        borderRadius: '4px',
        boxShadow: 5,
        maxWidth: '300px',
        minWidth: '300px',
        maxHeight: '420px',
        flexDirection: 'column',
        position: 'sticky',
        zIndex: 1,
        top: '5rem',
        '@media (max-width: 600px)': {
          maxWidth: '100%',
          position: 'relative',
          marginBottom: '1rem',
          maxHeight: '500px',
        },
      }}
    >
      <HardwareFilter onFilter={handleFilter} />
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem',
          '@media (max-width: 600px)': {
            flexDirection: 'column',
            gap: '0.5rem',
          },
        }}
      >
        <FormControl
          variant="outlined"
          sx={{
            width: '120px',
            '@media (max-width: 600px)': {
              width: '100%',
            },
          }}
        >
          <InputLabel id="order-label">Order By</InputLabel>
          <Select labelId="order-label" id="order-select" value={orderBy} onChange={handleOrderChange} label="Order By">
            <MenuItem value="id">None</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          sx={{
            width: 'fit-content',
            '@media (max-width: 600px)': {
              width: '100%',
            },
          }}
        >
          <InputLabel id="direction-label">Direction</InputLabel>
          <Select
            labelId="direction-label"
            id="direction-select"
            value={direction}
            onChange={handleDirectionChange}
            label="Direction"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default FilterSort;
