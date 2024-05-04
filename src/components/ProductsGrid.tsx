import React, { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Pagination, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useProducts } from '../hooks/product/useProducts';
import { Product } from '../types/Product';

type ProductsGridProps = {
  orderBy?: string;
  direction?: string;
  minPrice?: number;
  maxPrice?: number;
  textSearch?: string;
  userId?: number;
  categoryName?: string;
};

function ProductsGrid({
  orderBy = 'id',
  direction = 'asc',
  minPrice = 0,
  maxPrice = 1000000,
  textSearch = '',
  userId = -1,
  categoryName = '',
}: ProductsGridProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useProducts(
    orderBy,
    direction,
    page,
    minPrice,
    maxPrice,
    textSearch,
    userId,
    categoryName,
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>An error occurred while fetching data</div>;
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Grid container spacing={2}>
          {data.products.map((part: Product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg
              key={part.id}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Card
                sx={{
                  height: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minWidth: 250,
                  '&:hover': {
                    boxShadow: 5,
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={Math.random() < 0.5 ? '/alt1.png' : '/alt2.png'}
                  alt={part.name}
                />
                <CardContent>
                  <Typography color="text.secondary" variant="h5">
                    {part.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'auto',
                      maxHeight: 100,
                      '&::-webkit-scrollbar': {
                        display: 'none',
                      },
                    }}
                  >
                    {part.description}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <CardActions>
                    <RouterLink to={`/detail/${part.id}`}>
                      <Button size="small" color="primary">
                        View Details
                      </Button>
                    </RouterLink>
                  </CardActions>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Typography variant="body1" color="text.secondary">
                        Price:
                      </Typography>
                      <Typography
                        variant="body1"
                        color="success.main"
                        sx={{ fontWeight: 'bold', marginLeft: '0.5rem' }}
                      >
                        ${part.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination count={data.nrOfPages} page={page} onChange={handlePageChange} sx={{ margin: '1rem auto' }} />
      </Box>
    </>
  );
}

export default ProductsGrid;
