import React from 'react';
import { Snackbar, useTheme } from '@mui/material';
import Alert from '@mui/material/Alert';

type CustomSnackbarProps = {
  open: boolean;
  handleClose: () => void;
  message: string;
  severity: 'error' | 'success' | 'info' | 'warning';
};

function CustomSnackbar({ open, handleClose, message, severity }: CustomSnackbarProps) {
  const theme = useTheme();

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{
          width: '100%',
          backgroundColor: theme.palette[severity]?.contrastText,
          color: theme.palette[severity]?.main,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
