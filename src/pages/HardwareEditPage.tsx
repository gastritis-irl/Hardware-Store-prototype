import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { useHardwarePart } from '../hooks/useHardwarePart';
import { useUpdateHardwarePart } from '../hooks/useUpdateHardwarePart';
import { HardwarePart } from '../types/HardwarePart';
import CustomSnackbar from '../util/CustomSnackbar';

function HardwareEditPage() {
  const { id } = useParams();
  const idNumber = Number(id) || 0; // Convert id to number and provide a default value
  const [open, setOpen] = useState(false);
  const [partData, setPartData] = useState<HardwarePart>({
    id: 0,
    name: '',
    manufacturer: '',
    category: '',
    price: 0,
    description: '',
    userId: 0,
  });

  const navigate = useNavigate();
  const { data: fetchedPartData, isLoading: isFetching } = useHardwarePart(idNumber);
  const updatePartMutation = useUpdateHardwarePart();

  useEffect(() => {
    if (fetchedPartData) {
      setPartData(fetchedPartData);
    }
  }, [fetchedPartData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartData({
      ...partData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updatePartMutation.mutate(
      { id: idNumber, part: partData },
      {
        onSuccess: (data) => {
          // Redirect to the detail page of the updated hardware part
          navigate(`/detail/${data.id}`);
          // Open the Snackbar
          setOpen(true);
        },
      },
    );
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (updatePartMutation.isError) {
    return <div>An error occurred while updating the hardware part</div>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <TextField label="Name" name="name" value={partData.name} onChange={handleChange} />
      <TextField label="Manufacturer" name="manufacturer" value={partData.manufacturer} onChange={handleChange} />
      <TextField label="Category" name="category" value={partData.category} onChange={handleChange} />
      <TextField label="Price" name="price" value={partData.price} onChange={handleChange} type="number" />
      <TextField label="Description" name="description" value={partData.description} onChange={handleChange} />
      <TextField label="User ID" name="userId" value={partData.userId} onChange={handleChange} type="number" />
      <Button type="submit" variant="contained">
        Update
      </Button>
      <CustomSnackbar
        open={open}
        handleClose={() => setOpen(false)}
        message="Hardware part updated successfully!"
        severity="success"
      />
    </Box>
  );
}

export default HardwareEditPage;
