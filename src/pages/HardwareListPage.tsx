import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHardwareParts } from '../hooks/useHardwareParts';
import HardwarePartsGrid from '../util/HardwarePartsGrid';
import HardwareFilter from '../util/HardwareFilter';

function HardwareListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [minPrice, setMinPrice] = useState(params.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(params.get('maxPrice') || '');
  const [textSearch, setTextSearch] = useState(params.get('textSearch') || '');
  const [orderBy, setOrderBy] = useState<string>('id');
  const [direction, setDirection] = useState<string>('asc');

  useEffect(() => {
    setOrderBy(params.get('orderBy') || 'id');
    setDirection(params.get('direction') || 'asc');
  }, [location]);

  const handleFilter = (mPrice: number, maPrice: number, tSearch: string) => {
    setMinPrice(mPrice.toString());
    setMaxPrice(maPrice.toString());
    setTextSearch(tSearch);
    navigate({
      pathname: location.pathname,
      search: `?minPrice=${mPrice}&maxPrice=${maPrice}&textSearch=${tSearch}&orderBy=${orderBy}&direction=${direction}`,
    });
  };

  const handleOrderChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setOrderBy(value);
    navigate({
      pathname: location.pathname,
      search: `?minPrice=${minPrice}&maxPrice=${maxPrice}&textSearch=${textSearch}&orderBy=${value}&direction=${direction}`,
    });
  };

  const handleDirectionChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setDirection(value);
    navigate({
      pathname: location.pathname,
      search: `?minPrice=${minPrice}&maxPrice=${maxPrice}&textSearch=${textSearch}&orderBy=${orderBy}&direction=${value}`,
    });
  };

  const { data, isLoading, isError } = useHardwareParts(
    orderBy,
    direction,
    0,
    Number.parseFloat(minPrice),
    Number.parseFloat(maxPrice),
    textSearch,
  );

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError || !data) {
    return <Typography>An error occurred while fetching data</Typography>;
  }

  return (
    <Box
      sx={{
        marginTop: '1rem',
        display: 'flex',
        // gap: '2rem',
        '@media (max-width: 600px)': {
          flexDirection: 'column',
          gap: '0',
        },
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: '1rem',
          zIndex: 10,
          backgroundColor: 'background.paper',
          padding: '1rem',
          boxShadow: 5,
          borderRadius: '4px',
          maxWidth: '3000px',
          minWidth: '300px',
          maxHeight: '370px',
          '@media (max-width: 600px)': {
            maxWidth: '100%',
          },
        }}
      >
        <HardwareFilter onFilter={handleFilter} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          {/* Order By Select */}
          <FormControl variant="outlined" sx={{ minWidth: 100 }}>
            <InputLabel id="order-label">Order By</InputLabel>
            <Select
              labelId="order-label"
              id="order-select"
              value={orderBy}
              onChange={handleOrderChange}
              label="Order By"
            >
              <MenuItem value="id">None</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="price">Price</MenuItem>
            </Select>
          </FormControl>

          {/* Direction Select */}
          <FormControl variant="outlined" sx={{ minWidth: 100 }}>
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

      <HardwarePartsGrid
        orderBy={orderBy}
        direction={direction}
        minPrice={Number.parseFloat(minPrice)}
        maxPrice={Number.parseFloat(maxPrice)}
        textSearch={textSearch}
      />
    </Box>
  );
}

export default HardwareListPage;
