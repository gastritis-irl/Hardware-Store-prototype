import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { HardwarePart } from '../types/HardwarePart';

type HardwareFormProps = {
  partData: HardwarePart;
  setPartData: (partData: HardwarePart) => void;
  handleSubmit: (event: React.FormEvent) => void;
  formTitle: string;
  submitButtonText: string;
  icon: React.ReactElement;
};

function HardwareForm({ partData, setPartData, handleSubmit, formTitle, submitButtonText, icon }: HardwareFormProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartData({
      ...partData,
      [event.target.name]: event.target.value,
    });
  };

  const newIcon = React.cloneElement(icon, { color: 'inherit', sx: { fontSize: 20 } });
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
        maxWidth: '600px',
        margin: 'auto',
        padding: '1rem',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {icon}
        <Typography variant="h4" align="center" color="primary">
          {formTitle}
        </Typography>
      </Box>
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
        value={partData.categoryName}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Price($)"
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        sx={{ flexDirection: 'row', gap: '0.5rem' }}
      >
        {newIcon}
        {submitButtonText}
      </Button>
    </Box>
  );
}

export default HardwareForm;
