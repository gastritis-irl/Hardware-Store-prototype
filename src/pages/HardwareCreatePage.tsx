import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreateHardwarePart } from '../hooks/useCreateHardwarePart';
import { HardwarePart } from '../types/HardwarePart';
import CustomSnackbar from '../util/CustomSnackbar';
import { useSnackbar } from '../util/SnackbarContext';

function HardwareCreatePage() {
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

  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const createPartMutation = useCreateHardwarePart();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartData({
      ...partData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createPartMutation.mutate(partData, {
      onSuccess: (data) => {
        navigate(`/detail/${data.id}`);
        // Open the Snackbar
        setOpen(true);
        if (snackbar) {
          snackbar.openSnackbar('Hardware part created successfully!', 'success');
        }
      },
      onError: (error) => {
        if (snackbar) {
          snackbar.openSnackbar(error.message, 'error');
        }
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <TextField label="Name" name="name" value={partData.name} onChange={handleChange} />
      <TextField label="Manufacturer" name="manufacturer" value={partData.manufacturer} onChange={handleChange} />
      <TextField label="Category" name="category" value={partData.category} onChange={handleChange} />
      <TextField label="Price" name="price" value={partData.price} onChange={handleChange} type="number" />
      <TextField label="Description" name="description" value={partData.description} onChange={handleChange} />
      <TextField label="User ID" name="userId" value={partData.userId} onChange={handleChange} type="number" />
      <Button type="submit" variant="contained">
        Create
      </Button>
      <CustomSnackbar
        open={open}
        handleClose={() => setOpen(false)}
        message="Hardware part created successfully!"
        severity="success"
      />
    </Box>
  );
}

export default HardwareCreatePage;
