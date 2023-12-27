import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { HardwarePart } from '../types/HardwarePart';

type HardwareFormProps = {
  partData: HardwarePart;
  setPartData: (partData: HardwarePart) => void;
  handleSubmit: (event: React.FormEvent) => void;
  formTitle: string;
  submitButtonText: string;
};

function HardwareForm({ partData, setPartData, handleSubmit, formTitle, submitButtonText }: HardwareFormProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartData({
      ...partData,
      [event.target.name]: event.target.value,
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
        {formTitle}
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
      <Button type="submit" variant="contained" color="primary" size="large">
        {submitButtonText}
      </Button>
    </Box>
  );
}

export default HardwareForm;
