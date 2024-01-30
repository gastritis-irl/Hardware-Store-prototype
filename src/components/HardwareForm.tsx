import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { HardwarePart } from '../types/HardwarePart';
import { useGetCategories } from '../hooks/category/useCategories';

type HardwareFormProps = {
  partData: HardwarePart;
  setPartData: (partData: HardwarePart) => void;
  handleSubmit: (event: React.FormEvent) => void;
  formTitle: string;
  submitButtonText: string;
  icon: React.ReactElement;
};

function HardwareForm({ partData, setPartData, handleSubmit, formTitle, submitButtonText, icon }: HardwareFormProps) {
  const { data: categories } = useGetCategories(1, 14);
  const [selectedCategory, setSelectedCategory] = useState(partData.categoryName);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
    setPartData({ ...partData, categoryName: event.target.value as string });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartData({ ...partData, [event.target.name]: event.target.value });
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
        backgroundColor: 'background.paper',
        borderRadius: '1rem',
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
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          label="Category"
          id="category-select"
          value={selectedCategory}
          MenuProps={{ disableScrollLock: true }}
          onChange={handleCategoryChange}
        >
          {categories?.categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
