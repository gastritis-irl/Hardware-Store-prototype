import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useHardwareParts } from '../hooks/useHardwareParts';
import { HardwarePart } from '../types/HardwarePart';

function HardwareListPage() {
  const { data: hardwareParts, isLoading, isError } = useHardwareParts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occurred while fetching data</div>;
  }

  return (
    <Grid container spacing={2}>
      {hardwareParts?.map((part: HardwarePart) => (
        <Grid item xs={12} sm={6} md={4} key={part.id}>
          <Card sx={{ height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardMedia
              component="img"
              height="140"
              image={Math.random() < 0.5 ? '/alt1.png' : '/alt2.png'}
              alt={part.name}
            />
            <CardContent>
              <Typography variant="h5">{part.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {part.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to={`/detail/${part.id}`}>
                View Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default HardwareListPage;
