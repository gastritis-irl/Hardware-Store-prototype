import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import ClownIcon from '@mui/icons-material/EmojiEmotions';
import { useHardwarePart } from '../../hooks/hardware/useHardwarePart';
import { useDeleteHardwarePart } from '../../hooks/hardware/useDeleteHardwarePart';
import { useSnackbar } from '../../context/SnackbarContext';
import CustomButton from '../../util/CustomButton';
import { useAuthContext } from '../../context/AuthContext';

function HardwareDetailPage() {
  const { id } = useParams();
  const idNumber = Number(id) || 0;
  const { data: partData, isLoading, isError } = useHardwarePart(idNumber);
  const deletePartMutation = useDeleteHardwarePart();
  const snackbar = useSnackbar();
  const { authState } = useAuthContext();
  const navigate = useNavigate();

  const handleDelete = () => {
    deletePartMutation.mutate(idNumber, {
      onSuccess: () => {
        navigate('/');
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
    <Grid container spacing={2} sx={{ marginY: '1rem' }}>
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
            <Typography variant="h6">Category: {partData.categoryName}</Typography>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardActions>
              {(authState.role === 'ADMIN' || authState.id === partData.userId) && (
                <>
                  <CustomButton size="small" color="primary" onClick={() => navigate(`/edit/${partData.id}`)}>
                    Edit
                  </CustomButton>
                  <Button size="small" color="error" onClick={handleDelete}>
                    Delete
                  </Button>
                </>
              )}
            </CardActions>
            <CardActions>
              <Button size="small" color="primary" onClick={() => navigate(`/profile/${partData.userId}`)}>
                <ClownIcon color="inherit" />
                View owner&apos;s profile
              </Button>
            </CardActions>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default HardwareDetailPage;
