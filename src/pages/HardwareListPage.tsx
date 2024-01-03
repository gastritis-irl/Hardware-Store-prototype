import React from 'react';
import { Box } from '@mui/material';
import HardwarePartsGrid from '../components/HardwarePartsGrid';
import FilterSort from '../components/FilterSort';
import { useFilterSort } from '../hooks/useFilterSort';

function HardwareListPage() {
  const {
    orderBy,
    direction,
    minPrice,
    maxPrice,
    textSearch,
    category,
    handleOrderChange,
    handleDirectionChange,
    handleFilter,
  } = useFilterSort();

  return (
    <Box
      sx={{
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      <FilterSort
        orderBy={orderBy}
        direction={direction}
        handleOrderChange={handleOrderChange}
        handleDirectionChange={handleDirectionChange}
        handleFilter={handleFilter}
      />
      <HardwarePartsGrid
        orderBy={orderBy}
        direction={direction}
        minPrice={minPrice}
        maxPrice={maxPrice}
        textSearch={textSearch}
        categoryName={category}
      />
    </Box>
  );
}

export default HardwareListPage;
