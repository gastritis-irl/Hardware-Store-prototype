import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetCategories } from '../hooks/category/useCategories';

type HardwareFilterProps = {
  onFilter: (minPrice: number, maxPrice: number, textSearch: string, category: string) => void;
};

function ProductFilter({ onFilter }: HardwareFilterProps) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [textSearch, setTextSearch] = useState('');
  const [category, setCategory] = useState('');
  const { data } = useGetCategories(1, 15);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  let categoryNames: string[] = [];

  if (data) {
    categoryNames = data?.categories.map((categoryData) => categoryData.name) || [];
  }

  useEffect(() => {
    setMinPrice(Number(params.get('minPrice')) || undefined);
    setMaxPrice(Number(params.get('maxPrice')) || undefined);
    setTextSearch(params.get('textSearch') || '');
    setCategory(params.get('categoryName') || '');
  }, [location]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onFilter(Number(minPrice), Number(maxPrice), textSearch, category);
    queryClient.invalidateQueries({ queryKey: ['products'] });
    const orderBy = params.get('orderBy') || 'id';
    const direction = params.get('direction') || 'asc';
    navigate({
      pathname: location.pathname,
      search: `?categoryName=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&textSearch=${textSearch}&orderBy=${orderBy}&direction=${direction}`,
    });
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setCategory(value);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        // padding: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: 'background.paper',
        // boxShadow: 5,
        // position: 'sticky',
        top: '1rem',
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
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          value={category}
          onChange={handleCategoryChange}
          label="Category"
        >
          {categoryNames.map((categoryName) => (
            <MenuItem key={categoryName} value={categoryName}>
              {categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Min Price"
        type="number"
        value={minPrice || ''}
        onChange={(e) => setMinPrice(Number.parseFloat(e.target.value))}
        variant="outlined"
        color="primary"
      />
      <TextField
        label="Max Price"
        type="number"
        value={maxPrice || ''}
        onChange={(e) => setMaxPrice(Number.parseFloat(e.target.value))}
        variant="outlined"
        color="primary"
      />
      <TextField
        label="Text Search"
        value={textSearch || ''}
        onChange={(e) => setTextSearch(e.target.value)}
        variant="outlined"
        color="primary"
      />
      <Button type="submit" variant="contained" color="primary">
        Apply Filter
      </Button>
    </Box>
  );
}

export default ProductFilter;
