import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { HardwarePart } from '../types/HardwarePart';

type HardwarePartsGridProps = {
  hardwareParts: HardwarePart[];
};

function HardwarePartsGrid({ hardwareParts }: HardwarePartsGridProps) {
  return (
    <Grid container spacing={2}>
      {hardwareParts.map((part: HardwarePart) => (
        <Grid item xs={12} sm={6} md={4} key={part.id}>
          <Card sx={{ height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', mt: 2 }}>
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
            <CardActions>
              <RouterLink to={`/detail/${part.id}`}>
                <Button size="small" color="primary">
                  View Details
                </Button>
              </RouterLink>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default HardwarePartsGrid;
