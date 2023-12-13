import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useHardwarePart } from '../hooks/useHardwarePart';
import { useDeleteHardwarePart } from '../hooks/useDeleteHardwarePart';

function HardwareDetailPage() {
  const { id } = useParams();
  const idNumber = Number(id) || 0;
  const navigate = useNavigate();
  const { data: partData, isLoading, isError } = useHardwarePart(idNumber);
  const deletePartMutation = useDeleteHardwarePart();

  const handleDelete = () => {
    deletePartMutation.mutate(idNumber, {
      onSuccess: () => {
        // Redirect to the list page after a successful deletion
        navigate('/');
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
    <Card>
      <CardContent>
        <Typography variant="h5">{partData.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {partData.description}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate(`/edit/${partData.id}`)}>
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}

export default HardwareDetailPage;
