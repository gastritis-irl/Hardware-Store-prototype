import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetCategories } from '../hooks/useCategories';
import CategoryCard from '../components/CategoryCard';
import CustomButton from '../util/CustomButton';

function HomePage() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(12);
  const { data: categories, isLoading, isError } = useGetCategories(page, pageSize);
  const navigate = useNavigate();

  const handlePageChange = (event: ChangeEvent<unknown>, value: React.SetStateAction<number>) => {
    setPage(value);
  };

  useEffect(() => {
    const calculatePageSize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setPageSize(4);
        // } else if (width < 960) {
        //   setPageSize(4);
      } else if (width < 1150) {
        setPageSize(6);
      } else {
        setPageSize(8);
      }
    };

    calculatePageSize();
    window.addEventListener('resize', calculatePageSize);

    return () => {
      window.removeEventListener('resize', calculatePageSize);
    };
  }, []);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          gap: '1rem',
        }}
      >
        <Typography variant="h2" color="primary">
          Welcome to Hardware Store
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Your one-stop shop for all your hardware needs
        </Typography>
        <CustomButton onClick={() => navigate('/list')}>
          <Typography variant="h5" color="inherit">
            {' '}
            Browse to your heart&apos;s content
          </Typography>
        </CustomButton>
        <Typography variant="h5" color="text.secondary">
          or
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Are you looking for a ...?
        </Typography>
        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          {isLoading && <Typography>Loading...</Typography>}
          {isError && <Typography>An error occurred while fetching data</Typography>}
          {categories &&
            categories.categories.map((category) => <CategoryCard key={category.id} category={category} />)}
        </Grid>
        <Typography variant="h6" color="text.secondary">
          ... or something else?
        </Typography>
        <Typography variant="h5" color="text.secondary">
          We have it all!
        </Typography>
        <Pagination count={categories?.nrOfPages} page={page} onChange={handlePageChange} />
        <Box sx={{ position: 'relative', bottom: 0, width: '100%', textAlign: 'center', pb: 2 }}>
          <Typography variant="body2">Contact us: email@example.com | +1 234 567 890</Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
