import React, { useState } from 'react';
import { Button, TextField, Snackbar, Alert } from '@mui/material';

type SizeSelectorProps = {
  onStart: (size: number) => void;
};

export function SizeSelector({ onStart }: SizeSelectorProps) {
  const [size, setSize] = useState(4);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    if (!Number.isNaN(newSize) && newSize >= 2) {
      setSize(newSize);
    }
  };

  const handleStartClick = () => {
    if (size >= 2 && size % 2 === 0) {
      onStart(size);
    } else {
      setSnackbarMessage('Please enter an even number greater than zero for the size.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <TextField
        label="Tábla mérete"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={size}
        onChange={handleSizeChange}
        inputProps={{ min: '2', step: '2' }}
      />
      <Button variant="contained" color="primary" onClick={handleStartClick}>
        Start game!
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
