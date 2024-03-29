import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';

export const useFilterSort = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [orderBy, setOrderBy] = useState<string>('id');
  const [direction, setDirection] = useState<string>('asc');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [textSearch, setTextSearch] = useState('');
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    setOrderBy(params.get('orderBy') || 'id');
    setDirection(params.get('direction') || 'asc');
    setMinPrice(Number(params.get('minPrice')));
    setMaxPrice(Number(params.get('maxPrice')));
    setTextSearch(params.get('textSearch') || '');
    setCategoryName(params.get('categoryName') || '');
  }, [location]);

  const handleOrderChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setOrderBy(value);
    navigate({
      pathname: location.pathname,
      search: `?categoryName=${categoryName}&minPrice=${minPrice}&maxPrice=${maxPrice}&textSearch=${textSearch}&orderBy=${value}&direction=${direction}`,
    });
  };

  const handleDirectionChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setDirection(value);
    navigate({
      pathname: location.pathname,
      search: `?categoryName=${categoryName}&minPrice=${minPrice}&maxPrice=${maxPrice}&textSearch=${textSearch}&orderBy=${orderBy}&direction=${value}`,
    });
  };

  const handleFilter = (mPrice: number, maPrice: number, tSearch: string, category: string) => {
    setMinPrice(mPrice);
    setMaxPrice(maPrice);
    setTextSearch(tSearch);
    setCategoryName(category);
    navigate({
      pathname: location.pathname,
      search: `?categoryName=${category}&minPrice=${mPrice}&maxPrice=${maPrice}&textSearch=${tSearch}&orderBy=${orderBy}&direction=${direction}`,
    });
  };

  return {
    orderBy,
    direction,
    minPrice,
    maxPrice,
    textSearch,
    category: categoryName,
    handleOrderChange,
    handleDirectionChange,
    handleFilter,
  };
};
