import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

type HardwareFilterProps = {
  onFilter: (minPrice: number, maxPrice: number, textSearch: string) => void;
};

function HardwareFilter({ onFilter }: HardwareFilterProps) {
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [textSearch, setTextSearch] = useState('');
  const queryClient = useQueryClient();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setMinPrice(Number(params.get('minPrice')) || undefined);
    setMaxPrice(Number(params.get('maxPrice')) || undefined);
    setTextSearch(params.get('textSearch') || '');
  }, [location]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onFilter(Number(minPrice), Number(maxPrice), textSearch);
    queryClient.invalidateQueries({ queryKey: ['hardwareParts'] });
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

export default HardwareFilter;
