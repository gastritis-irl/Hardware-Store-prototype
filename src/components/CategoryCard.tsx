import React from 'react';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFilterSort } from '../hooks/useFilterSort';

type CategoryCardProps = {
  selectedCategory: {
    id: number;
    name: string;
    description: string;
  };
};

function CategoryCard({ selectedCategory }: CategoryCardProps) {
  const navigate = useNavigate();
  const { orderBy, direction, minPrice, maxPrice, textSearch } = useFilterSort();

  const handleClick = () => {
    navigate({
      pathname: '/list',
      search: `?categoryName=${selectedCategory.name}&minPrice=${minPrice}&maxPrice=${maxPrice}&textSearch=${textSearch}&orderBy=${orderBy}&direction=${direction}`,
    });
  };

  return (
    <Card
      key={selectedCategory.id}
      sx={{
        width: 250,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        // gap: '1rem',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: 5,
          transform: 'scale(1.05)',
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
          opacity: 1,
        },
      }}
      onClick={handleClick}
    >
      <Typography
        variant="h5"
        color="text.secondary"
        sx={{
          textAlign: 'center',
          // backgroundColor: 'rgba(0, 0, 0, 0.7)',
          // color: 'secondary.main',
          paddingTop: 1,
        }}
      >
        {selectedCategory.name}
      </Typography>
      <CardMedia
        component="img"
        height="260"
        image={`/${selectedCategory.name.toLowerCase()}.png`}
        alt={selectedCategory.name}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: '#fff',
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          overflowY: 'auto',
        }}
        className="mediaOverlay"
      >
        <Typography variant="body2">{selectedCategory.description}</Typography>
      </Box>
    </Card>
  );
}

export default CategoryCard;
