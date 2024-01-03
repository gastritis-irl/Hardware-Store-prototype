import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
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
        minWidth: 275,
        maxWidth: 275,
        minHeight: 275,
        maxHeight: 275,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          {category.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflowY: 'auto',
            maxHeight: 100,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {category.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
