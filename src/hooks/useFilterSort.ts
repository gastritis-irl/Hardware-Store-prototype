import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';

export const useFilterSort = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [orderBy, setOrderBy] = useState<string>('id');
  const [direction, setDirection] = useState<string>('asc');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [textSearch, setTextSearch] = useState('');

  useEffect(() => {
    setOrderBy(params.get('orderBy') || 'id');
    setDirection(params.get('direction') || 'asc');
    setMinPrice(Number(params.get('minPrice')) || undefined);
    setMaxPrice(Number(params.get('maxPrice')) || undefined);
    setTextSearch(params.get('textSearch') || '');
  }, [location]);

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

  const handleFilter = (mPrice: number, maPrice: number, tSearch: string) => {
    setMinPrice(mPrice);
    setMaxPrice(maPrice);
    setTextSearch(tSearch);
    navigate({
      pathname: location.pathname,
      search: `?minPrice=${mPrice}&maxPrice=${maPrice}&textSearch=${tSearch}&orderBy=${orderBy}&direction=${direction}`,
    });
  };

  return {
    orderBy,
    direction,
    minPrice,
    maxPrice,
    textSearch,
    handleOrderChange,
    handleDirectionChange,
    handleFilter,
  };
};
