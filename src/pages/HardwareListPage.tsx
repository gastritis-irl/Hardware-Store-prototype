import React from 'react';
import { Box } from '@mui/material';
import HardwarePartsGrid from '../components/HardwarePartsGrid';
import FilterSort from '../components/FilterSort';
import { useFilterSort } from '../hooks/useFilterSort';

function HardwareListPage() {
  const { orderBy, direction, minPrice, maxPrice, textSearch, handleOrderChange, handleDirectionChange, handleFilter } =
    useFilterSort();

  return (
    <Box
      sx={{
        marginTop: '1rem',
        display: 'flex',
        // gap: '2rem',
        '@media (max-width: 600px)': {
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
        },
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: '5rem',
          zIndex: 10,
          backgroundColor: 'background.paper',
          boxShadow: 5,
          borderRadius: '4px',
          marginRight: '1rem',
          maxHeight: '370px',
          '@media (max-width: 600px)': {
            maxWidth: '100%',
            position: 'relative',
            marginBottom: '1rem',
          },
        }}
      >
        <FilterSort
          orderBy={orderBy}
          direction={direction}
          handleOrderChange={handleOrderChange}
          handleDirectionChange={handleDirectionChange}
          handleFilter={handleFilter}
        />
      </Box>

      <HardwarePartsGrid
        orderBy={orderBy}
        direction={direction}
        minPrice={minPrice}
        maxPrice={maxPrice}
        textSearch={textSearch}
      />
    </Box>
  );
}

export default HardwareListPage;
