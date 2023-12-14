import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useHardwarePart } from '../hooks/useHardwarePart';
import { useDeleteHardwarePart } from '../hooks/useDeleteHardwarePart';
import { useSnackbar } from '../context/SnackbarContext';
import CustomSnackbar from '../util/CustomSnackbar';

function HardwareDetailPage() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const idNumber = Number(id) || 0;
  const navigate = useNavigate();
  const { data: partData, isLoading, isError } = useHardwarePart(idNumber);
  const deletePartMutation = useDeleteHardwarePart();
  const snackbar = useSnackbar();

  const handleDelete = () => {
    deletePartMutation.mutate(idNumber, {
      onSuccess: () => {
        navigate('/');
        setOpen(true);
        if (snackbar) {
          snackbar.openSnackbar('Part deleted successfully!', 'success');
        }
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !partData) {
    return <div>An error occurred while fetching data</div>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <CardMedia
          component="img"
          height="500"
          image={Math.random() < 0.5 ? '/alt1.png' : '/alt2.png'}
          alt={partData.name}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h3">{partData.name}</Typography>
            <Typography variant="body1" color="text.secondary">
              {partData.description}
            </Typography>
            <Typography variant="h6">Price: ${partData.price}</Typography>
            <Typography variant="h6">Manufacturer: {partData.manufacturer}</Typography>
            <Typography variant="h6">Category: {partData.category}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={() => navigate(`/edit/${partData.id}`)}>
              Edit
            </Button>
            <Button size="small" color="secondary" onClick={handleDelete}>
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <CustomSnackbar
        open={open}
        handleClose={() => setOpen(false)}
        message="Part deleted successfully!"
        severity="success"
      />
    </Grid>
  );
}

export default HardwareDetailPage;
