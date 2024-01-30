import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAuth } from '../hooks/user/useAuth';
import { useSnackbar } from '../context/SnackbarContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    loginMutation: { mutate },
  } = useAuth();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate('/');
          if (snackbar) {
            snackbar.openSnackbar('User logged in successfully!', 'success');
          }
        },
        onError: (error) => {
          if (snackbar) {
            snackbar.openSnackbar(error.message, 'error');
          }
        },
      },
    );
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
        minWidth: '600px',
        margin: 'auto',
        padding: '1rem',
        // justifyContent: 'flex',
        alignItems: 'center',
        minHeight: '60vh',
        backgroundColor: 'background.paper',
        borderRadius: '1rem',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <LockOpenIcon color="primary" sx={{ fontSize: 40 }} />
        <Typography variant="h4" align="center" color="primary">
          Login
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ maxWidth: '50% ', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <LockOpenIcon color="inherit" sx={{ fontSize: 20 }} />
        Login
      </Button>
    </Box>
  );
}

export default LoginPage;
