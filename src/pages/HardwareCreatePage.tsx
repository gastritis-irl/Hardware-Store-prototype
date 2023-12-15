import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreateHardwarePart } from '../hooks/useCreateHardwarePart';
import { HardwarePart } from '../types/HardwarePart';
import CustomSnackbar from '../util/CustomSnackbar';
import { useSnackbar } from '../context/SnackbarContext';

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
      onSuccess: (data: HardwarePart) => {
        navigate(`/detail/${data.id}`);
        setOpen(true);
        if (snackbar) {
          snackbar.openSnackbar('Hardware part created successfully!', 'success');
        }
      },
      onError: (error: Error) => {
        setOpen(true);
        if (snackbar) {
          snackbar.openSnackbar(error.message, 'error');
        }
      },
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
        margin: 'auto',
        padding: '1rem',
      }}
    >
      <Typography variant="h4" align="center">
        Create Hardware Part
      </Typography>
      <TextField label="Name" name="name" value={partData.name} onChange={handleChange} variant="outlined" fullWidth />
      <TextField
        label="Manufacturer"
        name="manufacturer"
        value={partData.manufacturer}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Category"
        name="category"
        value={partData.category}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Price"
        name="price"
        value={partData.price}
        onChange={handleChange}
        type="number"
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={partData.description}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="User ID"
        name="userId"
        value={partData.userId}
        onChange={handleChange}
        type="number"
        variant="outlined"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" size="large">
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
