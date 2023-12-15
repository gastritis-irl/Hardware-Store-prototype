import React from 'react';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

type CustomSnackbarProps = {
  open: boolean;
  handleClose: () => void;
  message: string;
  severity: 'error' | 'success' | 'info' | 'warning' | undefined;
};

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ open, handleClose, message, severity }) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

export default CustomSnackbar;