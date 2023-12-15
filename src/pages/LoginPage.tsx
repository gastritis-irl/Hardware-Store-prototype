import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { useSnackbar } from '../context/SnackbarContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const loginMutation = useLogin();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate('/');
          // setOpen(true);
          if (snackbar) {
            snackbar.openSnackbar('User logged in successfully!', 'success');
          }
        },
        onError: (error) => {
          // setOpen(true);
          if (snackbar) {
            snackbar.openSnackbar(error.message, 'error');
          }
        },
      },
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" variant="contained">
        Log in
      </Button>
    </Box>
  );
}

export default LoginPage;
