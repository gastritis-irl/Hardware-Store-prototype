import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useGetCategories } from '../hooks/useCategories';
import CategoryCard from '../components/CategoryCard';

function HomePage() {
  const { data: categories, isLoading, isError } = useGetCategories();

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
        <Typography variant="h6" color="text.secondary">
          Categories:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            overflowY: 'hidden',
            maxHeight: 300,
            maxWidth: '100%',
            gap: '1rem',
            // '&::-webkit-scrollbar': {
            //   display: 'none',
            // },
          }}
        >
          {isLoading && <Typography>Loading...</Typography>}
          {isError && <Typography>An error occurred while fetching data</Typography>}
          {categories && categories.map((category) => <CategoryCard key={category.id} category={category} />)}
        </Box>
        <Box sx={{ position: 'relative', bottom: 0, width: '100%', textAlign: 'center', pb: 2 }}>
          <Typography variant="body2">Contact us: email@example.com | +1 234 567 890</Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
