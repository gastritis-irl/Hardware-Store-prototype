import { Card as MuiCard, CardMedia, CardActionArea, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const CardBack = styled('div')(({ theme }) => ({
  height: 200,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '8em',
}));

type CardProps = {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  onClick: (id: number) => void;
};

export function Card(props: CardProps) {
  const { id, imageUrl, isFlipped, onClick } = props;

  return (
    <MuiCard onClick={() => onClick(id)} raised={isFlipped}>
      <CardActionArea>
        {isFlipped ? (
          <CardMedia component="img" height="200" image={imageUrl} alt={`Card ${id}`} />
        ) : (
          <CardBack>
            <Typography variant="h5">♠️</Typography>
          </CardBack>
        )}
      </CardActionArea>
    </MuiCard>
  );
}
