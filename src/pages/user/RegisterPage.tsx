import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddCircle } from '@mui/icons-material';
import { useAuth } from '../../hooks/user/useAuth';
import { useSnackbar } from '../../context/SnackbarContext';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const snackbar = useSnackbar();
  const {
    registerMutation: { mutate },
  } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate('/');
          if (snackbar) {
            snackbar.openSnackbar('User registered successfully!', 'success');
          }
        },
        onError: (error: Error) => {
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
      alignItems="center"
      alignContent="center"
      alignSelf="center"
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="on"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '400px',
        margin: 'auto',
        padding: '1rem',
        alignItems: 'center',
        minHeight: '60vh',
        backgroundColor: 'background.paper',
        borderRadius: '1rem',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AddCircle color="primary" sx={{ fontSize: 40 }} />
        <Typography variant="h4" align="center" color="primary">
          Register
        </Typography>
      </Box>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        fullWidth
        InputProps={{
          style: {
            color: email && password ? 'primary' : 'error',
          },
        }}
        InputLabelProps={{
          style: {
            color: email && password ? 'primary' : 'error',
          },
        }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        fullWidth
        InputProps={{
          style: {
            color: email && password ? 'primary' : 'error',
          },
        }}
        InputLabelProps={{
          style: {
            color: email && password ? 'primary' : 'error',
          },
        }}
      />
      <Button id="register" type="submit" variant="contained" color="primary" size="large">
        <AddCircle sx={{ marginRight: '0.5rem' }} />
        Register
      </Button>
    </Box>
  );
}

export default RegisterPage;
