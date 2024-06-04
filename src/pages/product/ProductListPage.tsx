import React from 'react';
import { Box } from '@mui/material';
import ProductsGrid from '../../components/ProductsGrid';
import FilterSort from '../../components/FilterSort';
import { useFilterSort } from '../../hooks/useFilterSort';

function ProductListPage() {
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
        '@media (max-width: 600px)': {
          flexDirection: 'column',
          gap: '5rem',
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
      <ProductsGrid
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

export default ProductListPage;
