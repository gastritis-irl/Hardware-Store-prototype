import React from 'react';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type CategoryCardProps = {
  category: {
    id: number;
    name: string;
    description: string;
  };
};

function CategoryCard({ category }: CategoryCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/list?category=${category.name}`);
  };

  return (
    <Card
      key={category.id}
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
        {category.name}
      </Typography>
      <CardMedia component="img" height="260" image={`/${category.name.toLowerCase()}.png`} alt={category.name} />
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
        <Typography variant="body2">{category.description}</Typography>
      </Box>
    </Card>
  );
}

export default CategoryCard;
