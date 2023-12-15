import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';
import { useSnackbar } from '../context/SnackbarContext';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const registerMutation = useRegister();
  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    registerMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate('/');
          if (snackbar) {
            snackbar.openSnackbar('User registered successfully!', 'success');
          }
        },
        onError: (error) => {
          if (snackbar) {
            snackbar.openSnackbar(error.message, 'error');
          }
        },
      },
    );

    if (!snackbar) {
      return;
    }
    snackbar.openSnackbar('User created successfully!', 'success');
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
        Register
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" size="large">
        Register
      </Button>
    </Box>
  );
}

export default RegisterPage;
